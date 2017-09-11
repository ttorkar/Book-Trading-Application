import actions from '../actions/actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_OUT_REQUESTS:
            return action.payload;
        case actions.REQUEST_BOOK:
            return [...state, action.payload];
        default:
            return state;
    }
}