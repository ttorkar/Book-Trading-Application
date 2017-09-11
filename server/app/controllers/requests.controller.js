var mongoose = require('mongoose');
var Request = mongoose.model('Request');

exports.createRequest = function(req, res) {
    var book = req.book;
    var from = req.decoded._id;
    var to = req.book.owner;
    var request = new Request({from: from, to: to, book: book._id});
    request.save(function(err) {
        if (err) return next(err);
        Request.findById(request.id)
            .populate('from', 'name')
            .populate('to', 'name')
            .populate('book', 'title')
            .exec(function(err, newRequest) {
                if (err) return next(err);
                return res.send(newRequest);
            });
    });
};

exports.getRequest = function(req, res, next) {
    Request.findById(req.params.requestId, function(err, request) {
        if (err) return next(err);
        if (!request) return res.status(400).send({message: 'Request doesn\'t exist'});
        req.request = request;
        return next();
    });
};

exports.listIncomingRequests = function(req, res) {
    Request.find({to: req.decoded._id})
        .populate('from', 'name')
        .populate('to', 'name')
        .populate('book', 'title')
        .sort({'createdAt': -1})
        .exec(function(err, requests) {
            if (err) return next(err);
            return res.send(requests);
        })
};

exports.listOutcomingRequests = function(req, res) {
    Request.find({from: req.decoded._id})
        .populate('from', 'name')
        .populate('to', 'name')
        .populate('book', 'title')
        .sort({'createdAt': -1})
        .exec(function(err, requests) {
            if (err) return next(err);
            return res.send(requests);
        })
};

exports.approveRequest = function(req, res, next) {
    changeRequestStatus(req.request, 'approved', function(err, request) {
        if (err) return next(err);
        return res.send(request);
    });
};

exports.rejectRequest = function(req, res) {
    changeRequestStatus(req.request, 'rejected', function(err, request) {
        if (err) return next(err);
        return res.send(request);
    });
};

exports.canChangeRequestStatus = function(req, res, next) {
    if (req.request.to != req.decoded._id) {
        return res.status(400).send({message: 'Invalid user'});
    }
    return next();
};

function changeRequestStatus(request, status, cb) {
    Request.findByIdAndUpdate(request._id, {status}, {new: true})
        .populate('from', 'name')
        .populate('to', 'name')
        .populate('book', 'title')
        .exec(function(err, newRequest) {
            return cb(err, newRequest);
        });
}