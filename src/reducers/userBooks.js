import actions from '../actions/actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_BOOK:
            return [action.payload, ...state];
        case actions.FETCH_USER_BOOKS:
            return action.payload;
        case actions.DELETE_BOOK:
            return state.filter(book => {
                return book._id !== action.payload;
            });
        default:
            return state;
    }
}