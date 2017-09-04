import {USERS_FETCH_SUCCEEDED, USER_FETCH_SUCCEEDED} from '../actions';

export default function user(state = {}, action) {
    switch (action.type) {
        case USERS_FETCH_SUCCEEDED:
            return {...state, users: action.users};
        case USER_FETCH_SUCCEEDED:
            return {...state, user: action.user};
        default:
            return state;
    }
}
