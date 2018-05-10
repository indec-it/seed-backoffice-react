import {
    FETCH_GENERAL_MONITORING,
    GENERAL_MONITORING_FETCHED,
    FETCH_RESPONSE_MONITORING,
    RESPONSE_MONITORING_FETCHED
} from '../actions/monitoring';


export default function monitoring(state = {loading: false}, action) {
    switch (action.type) {
        case FETCH_GENERAL_MONITORING:
        case FETCH_RESPONSE_MONITORING:
            return {...state, loading: true};
        case GENERAL_MONITORING_FETCHED:
            return {...state, generalMonitoring: action.generalMonitoring, loading: false};
        case RESPONSE_MONITORING_FETCHED:
            return {...state, responseMonitoring: action.responseMonitoring, loading: false};
        default:
            return state;
    }
}
