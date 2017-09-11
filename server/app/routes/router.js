var usersController = require('../controllers/users.controller');
var booksController = require('../controllers/books.controller');
var requestsController = require('../controllers/requests.controller');
var errorHandler = require('../utils/errorHandler');

module.exports = function(app) {

    // auth

    app.post('/login', usersController.validateLoginRequest, usersController.login);

    app.post('/register', usersController.validateRegisterRequest, usersController.register);

    app.post('/change-password', usersController.isAuthenticated, usersController.changePassword);

    app.post('/update', usersController.isAuthenticated, usersController.updateProfile);

    // books

    app.param('bookId', booksController.getBook);

    app.get('/books/all', usersController.isAuthenticated, booksController.list);

    app.get('/books/personal', usersController.isAuthenticated, booksController.listPersonal);

    app.get('/books/find', booksController.search);

    app.post('/books/add', usersController.isAuthenticated, booksController.add);

    app.get('/books/delete/:bookId', usersController.isAuthenticated, booksController.canDelete, booksController.delete);

    // requests

    app.param('requestId', requestsController.getRequest);

    app.get('/requests/incoming', usersController.isAuthenticated, requestsController.listIncomingRequests);

    app.get('/requests/outcoming', usersController.isAuthenticated, requestsController.listOutcomingRequests);

    app.get('/books/:bookId/request', usersController.isAuthenticated, requestsController.createRequest);

    app.get('/requests/:requestId/approve', usersController.isAuthenticated, requestsController.canChangeRequestStatus,
        requestsController.approveRequest);

    app.get('/requests/:requestId/reject', usersController.isAuthenticated, requestsController.canChangeRequestStatus,
        requestsController.rejectRequest);

    // handle errors

    app.use(errorHandler);

};