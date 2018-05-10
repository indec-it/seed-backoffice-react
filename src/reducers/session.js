import {SESSION_RECEIVED} from '../actions';

export default function session(state = {}, action) {
    switch (action.type) {
        case SESSION_RECEIVED:
            return {...state, profile: action.profile};
        default:
            return state;
    }
}
