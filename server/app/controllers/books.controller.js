var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var googleApi = require('../api/googleApi');

exports.search = function(req, res) {
    var searchTerm = req.query.q;
    if (searchTerm) {
        googleApi.findBooks(searchTerm, function(err, results) {
            if (err) return res.status(500).send({message: err.message || 'An internal error occurred'});
            return res.send(results);
        })
    } else {
        return res.send([]);
    }
};

exports.add = function(req, res, next) {
    var userId = req.decoded._id;
    var book = new Book(req.body);
    book.owner = userId;
    book.save(function(err) {
        if (err) return next(err);
        res.send(book);
    })
};

exports.delete = function(req, res) {
    req.book.remove(function(err) {
        if (err) return next(err);
        return res.send({success: true});
    })
};

exports.list = function(req, res) {
    Book.find({}).populate('owner', 'name country town').exec(function(err, books) {
        if (err) return next(err);
        const filtered = books.filter(function(book) {
            return book.owner.id !== req.decoded._id;
        });
        return res.send(filtered);
    })
};

exports.listPersonal = function(req, res) {
    Book.find({owner: req.decoded._id}, function(err, books) {
        if (err) return next(err);
        return res.send(books);
    })
};

exports.canDelete = function(req, res, next) {
    if (req.book.owner != req.decoded._id) return res.status(403).send({message: 'Invalid user'});
    next();
};

exports.getBook = function(req, res, next, id) {
    Book.findById(id, function(err, book) {
        if (err) return next(err);
        if (!book) return res.status(400).send({message: 'Book doesn\'t exist'});
        req.book = book;
        next();
    })
};