import actions from '../actions/actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ALL_BOOKS:
            return action.payload;
        default:
            return state;
    }
}