import actions from '../actions/actions';
import * as auth from '../auth/authHelpers';

let initialState = auth.getUser(auth.getToken());

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN:
        case actions.REGISTER:
        case actions.UPDATE_PROFILE:
            return action.payload;
        case actions.LOGOUT:
            return null;
        default:
            return state;
    }
}