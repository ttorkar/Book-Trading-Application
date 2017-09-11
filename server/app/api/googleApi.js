var request = require('request');

var url = 'https://www.googleapis.com/books/v1/volumes?maxResults=10&q=';

exports.findBooks = function(searchTerm, cb) {
    request(url + searchTerm, function(err, response, body) {
        if (err) return cb(err);
        var books = [];
        var items = JSON.parse(body).items;
        if (items) {
            books = items.map(function(item) {
                return {
                    googleId: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors,
                    img: item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
                }
            });
        }
        return cb(null, books);
    })
};