import {
    SESSION_RECEIVED,
    SESSION_REQUESTED,
    IS_MOBILE
} from '../actions';

export default function session(state = {loading: false, requested: false, isMobile: false}, action) {
    switch (action.type) {
        case SESSION_REQUESTED:
            return {
                ...state, loading: true, profile: null, requested: true
            };
        case SESSION_RECEIVED:
            return {...state, profile: action.profile, loading: false};
        case IS_MOBILE:
            return {...state, isMobile: action.isMobile};
        default:
            return state;
    }
}
