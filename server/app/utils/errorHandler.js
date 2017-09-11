module.exports = function(err, req, res, next) {
    var message;

    if (err.code && (err.code === 11000 || err.code === 11001)) {  // duplicate entry mongodb error
        message = 'Entry already exists';
    } else if (err.errors) {  // mongodb validation errors
        var errorKeys = Object.keys(err.errors);
        message = err.errors[errorKeys[0]].message;
    } else {
        message = 'An internal error occured'
    }
    return res.status(500).send({message: message});
};