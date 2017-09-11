import actions from './actions';
import * as auth from '../auth/authHelpers';

export default {
    login: (token) => {
        return (dispatch) => {
            auth.setToken(token);
            let user = auth.getUser(token);
            return dispatch({
                type: actions.LOGIN,
                payload: user
            });
        }
    },
    register: (token) => {
        return (dispatch) => {
            auth.setToken(token);
            let user = auth.getUser(token);
            return dispatch({
                type: actions.REGISTER,
                payload: user
            });
        };
    },
    logout: () => {
        return (dispatch) => {
            auth.removeToken();
            return dispatch({
                type: actions.LOGOUT
            });
        };
    },
    updateProfile: (token) => {
        auth.setToken(token);
        let user = auth.getUser(token);
        return (dispatch) => {
            return dispatch({
                type: actions.UPDATE_PROFILE,
                payload: user
            })
        }
    },
    addBook: (book) => {
        return {
            type: actions.ADD_BOOK,
            payload: book
        }
    },
    deleteBook: (id) => {
        return {
            type: actions.DELETE_BOOK,
            payload: id
        }
    },
    fetchAllBooks: (books) => {
        return {
            type: actions.FETCH_ALL_BOOKS,
            payload: books
        }
    },
    fetchUserBooks: (books) => {
        return {
            type: actions.FETCH_USER_BOOKS,
            payload: books
        }
    },
    requestBook: (request) => {
        return {
            type: actions.REQUEST_BOOK,
            payload: request
        }
    },
    fetchIncRequests: (requests) => {
        return {
            type: actions.FETCH_INC_REQUESTS,
            payload: requests
        }
    },
    fetchOutRequests: (requests) => {
        return {
            type: actions.FETCH_OUT_REQUESTS,
            payload: requests
        }
    },
    approveRequest: (request) => {
        return {
            type: actions.APPROVE_REQUEST,
            payload: request
        }
    },
    rejectRequest: (request) => {
        return {
            type: actions.REJECT_REQUEST,
            payload: request
        }
    }
}