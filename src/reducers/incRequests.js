import actions from '../actions/actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_INC_REQUESTS:
            return action.payload;
        case actions.APPROVE_REQUEST:
        case actions.REJECT_REQUEST:
            return state.map(request => {
                return (request._id === action.payload._id) ? action.payload : request;
            });
        default:
            return state;
    }
}