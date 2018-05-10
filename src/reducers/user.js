import {
    USERS_FETCH_SUCCEEDED,
    USERS_FETCH_REQUESTED,
    USER_FETCH_SUCCEEDED,
    USERS_FIND_SUCCEEDED,
    USER_SAVE_REQUESTED,
    USER_SAVE_SUCCEEDED
} from '../actions';

export default function user(state = {saving: false, loading: false}, action) {
    switch (action.type) {
        case USERS_FETCH_SUCCEEDED:
            return {...state, users: action.users, loading: false};
        case USER_FETCH_SUCCEEDED:
            return {...state, user: action.user};
        case USERS_FETCH_REQUESTED:
            return {...state, loading: true};
        case USERS_FIND_SUCCEEDED:
            return {...state, assignUsers: action.newUsers};
        case USER_SAVE_REQUESTED:
            return {...state, saving: true};
        case USER_SAVE_SUCCEEDED:
            return {...state, saving: false};
        default:
            return state;
    }
}
