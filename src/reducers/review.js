import {concat} from 'lodash';
import {
    FETCH_STATES,
    STATES_FETCHED,
    FETCH_STATE_INFO,
    STATE_INFO_FETCHED,
    FETCH_SURVEYS,
    SURVEYS_FETCHED,
    FETCH_SURVEY,
    SURVEY_FETCHED,
    REQUEST_REASSIGN_SURVEY,
    REQUEST_REOPEN_SURVEY,
    REQUEST_APPROVE_SURVEY,
    SET_REVIEW_FILTERS,
    ACTION_SUCCEEDED,
    CLEAR_SUCCEEDED,
    CLEAR_SURVEYS
} from '../actions/review';

const defaultState = {
    loading: true, success: false, searchParams: {}, working: false
};

export default function review(state = defaultState, action) {
    switch (action.type) {
        case FETCH_STATES:
            return {
                ...state, loading: true, surveys: null, usersList: null
            };
        case FETCH_STATE_INFO:
            return {
                ...state, loading: true, stateInfo: null, usersList: null
            };
        case FETCH_SURVEYS:
            return {...state, loading: true};
        case REQUEST_APPROVE_SURVEY:
        case REQUEST_REASSIGN_SURVEY:
        case REQUEST_REOPEN_SURVEY:
            return {...state, loading: true, working: true};
        case FETCH_SURVEY:
            return {...state, loading: true, surveyAddress: null};
        case STATES_FETCHED:
            return {
                ...state, loading: false, states: action.states, surveys: null
            };
        case STATE_INFO_FETCHED:
            return {
                ...state, loading: false, stateInfo: action.stateInfo, usersList: action.usersList
            };
        case SURVEYS_FETCHED:
            return {
                ...state,
                loading: false,
                surveysAddressList: concat(state.surveysAddressList || [], action.surveysAddressList),
                surveysSize: action.surveysSize
            };
        case SURVEY_FETCHED:
            return {...state, loading: false, surveyAddress: action.surveyAddress};
        case ACTION_SUCCEEDED:
            return {
                ...state,
                loading: false,
                working: false,
                success: true,
                surveyAddress: action.surveyAddress,
                err: action.err
            };
        case CLEAR_SUCCEEDED:
            return {...state, success: false};
        case CLEAR_SURVEYS:
            return {...state, surveysAddressList: null};
        case SET_REVIEW_FILTERS: {
            return {...state, searchParams: action.searchParams};
        }
        default:
            return state;
    }
}
