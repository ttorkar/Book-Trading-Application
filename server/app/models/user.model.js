var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        match: [/.+\@.+\..+/, "Email is invalid"]
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    salt: {
        type: String,
        required: true
    },
    country: String,
    town: String
});

UserSchema.methods.setPasswordHash = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    const hashPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hashPassword;
};

UserSchema.options.toJSON = {
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.salt;
    }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;