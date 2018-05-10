import {chunk} from 'lodash';
import {
    FETCH_POLLSTERS,
    POLLSTERS_FETCHED,
    FETCH_POLLSTER,
    POLLSTER_FETCHED
} from '../actions/pollsters';

export default function fieldMaterials(state = {loading: false}, action) {
    switch (action.type) {
        case FETCH_POLLSTERS:
            return {...state, loading: true, pollsterList: null};
        case POLLSTERS_FETCHED:
            return {...state, pollsterList: chunk(action.pollsters, 3), loading: false};
        case FETCH_POLLSTER:
            return {...state, loading: true, pollster: null};
        case POLLSTER_FETCHED:
            return {...state, pollster: action.pollster, loading: false};
        default:
            return state;
    }
}
