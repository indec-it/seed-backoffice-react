import {
    USER_FETCH_REQUESTED,
    USERS_FETCH_SUCCEEDED,
    USERS_FETCH_REQUESTED,
    USER_FETCH_SUCCEEDED,
    USERS_FIND_SUCCEEDED,
    USER_SAVE_REQUESTED,
    USER_SAVE_SUCCEEDED,
    USERS_VALIDATE_REQUESTED,
    USERS_VALIDATE_SUCCEEDED
} from '../actions';

export default function user(state = {
    saving: false,
    loading: false,
    success: false,
    users: null,
    findUsers: [],
    emailError: false,
    userError: false,
    working: false,
    size: 0,
    total: 0
}, action) {
    switch (action.type) {
        case USERS_FETCH_SUCCEEDED:
            return {
                ...state, users: action.users, loading: false, size: action.size, total: action.total
            };
        case USER_FETCH_SUCCEEDED:
            return {...state, user: action.user, loading: false};
        case USER_FETCH_REQUESTED:
        case USERS_FETCH_REQUESTED:
            return {...state, loading: true};
        case USERS_FIND_SUCCEEDED:
            return {...state, findUsers: action.findUsers};
        case USERS_VALIDATE_REQUESTED:
            return {...state, working: true};
        case USER_SAVE_REQUESTED:
            return {...state, saving: true};
        case USER_SAVE_SUCCEEDED:
            return {...state, saving: false, success: true};
        case USERS_VALIDATE_SUCCEEDED:
            return {
                ...state, emailError: action.email, userError: action.username, working: false
            };
        default:
            return state;
    }
}
