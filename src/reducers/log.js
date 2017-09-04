import {LOGS_FETCH_SUCCEEDED} from '../actions';

export default function user(state = {}, action) {
    switch (action.type) {
        case LOGS_FETCH_SUCCEEDED:
            return {...state, logs: action.logs};
        default:
            return state;
    }
}
