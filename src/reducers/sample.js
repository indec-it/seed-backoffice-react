import {
    SAMPLE_FETCH_SUCCEEDED,
    SAMPLE_FETCH_REQUESTED
} from '../actions/sample';

export default function session(state = {loading: false, requested: false, isMobile: false}, action) {
    switch (action.type) {
        case SAMPLE_FETCH_REQUESTED:
            return {
                ...state, loading: true, profile: null, requested: true
            };
        case SAMPLE_FETCH_SUCCEEDED:
            return {
                ...state, result: action.result, loading: false, size: action.size, total: action.total
            };
        default:
            return state;
    }
}
