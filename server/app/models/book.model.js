var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: [String],
    img: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;