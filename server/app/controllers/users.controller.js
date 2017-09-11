var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var User = require('mongoose').model('User');

exports.login = function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) return next(err);
        if (!user) {
            return res.status(400).send({message: 'User doesn\'t exist'});
        }
        if (!user.validPassword(req.body.password)) {
            return res.status(400).send({message: 'Invalid password'});
        }
        var token = jwt.sign(user.toJSON(), config.jwtSecret, {
            expiresIn: 24*60*60  // 24 hours
        });

        res.send({token: token});
    })
};

exports.register = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.setPasswordHash(newUser.password);

    User.findOne({email: newUser.email}, function(err, user) {
        if (err) return next(err);
        if (user) {
            return res.status(400).send({message: 'User with this email already exists'});
        } else {
            newUser.save(function(err) {
                if (err) return next(err);

                var token = jwt.sign(newUser.toJSON(), config.jwtSecret, {
                    expiresIn: 24*60*60  // 24 hours
                });

                return res.send({token: token});
            })
        }
    })
};

exports.changePassword = function (req, res) {
    User.findById(req.decoded._id, function(err, user) {
        if (!user.validPassword(req.body.oldPassword)) {
            res.status(400).send({message: 'Old password is invalid'});
        }
        user.setPasswordHash(req.body.newPassword);
        user.save(function(err) {
            if (err) return next(err);
            return res.send(user);
        })
    });
};

exports.isAuthenticated = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({message: 'Not authenticated'});
    }
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
        if (err) return res.status(401).send({message: 'Failed to authenticate token'});
        req.decoded = decoded;
        next();
    })
};

exports.validateLoginRequest = function(req, res, next) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({message: result.array()[0].msg});
        }
        return next();
    })
};

exports.validateRegisterRequest = function(req, res, next) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password should be at least 6 digits long').isLength({min: 6, max: undefined});

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            return res.status(400).send({message: result.array()[0].msg});
        }
        return next();
    })
};

exports.updateProfile = function(req, res, next) {
    User.findById(req.decoded._id, function(err, user) {
        Object.assign(user, req.body);
        user.save(function(err) {
            if (err) return next(err);
            var token = jwt.sign(user.toJSON(), config.jwtSecret, {
                expiresIn: 24*60*60  // 24 hours
            });

            res.send({token: token});
        })
    });
};