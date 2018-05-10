export const FETCH_STATES = 'FETCH_STATES';
export const STATES_FETCHED = 'STATES_FETCHED';

export const fetchStates = () => ({type: FETCH_STATES});
export const statesFetched = states => ({type: STATES_FETCHED, states});

export const FETCH_STATE_INFO = 'FETCH_ADDITIONAL_INFO';
export const STATE_INFO_FETCHED = 'STATE_INFO_FETCHED';

export const fetchStateInfo = stateId => ({type: FETCH_STATE_INFO, stateId});
export const stateInfoFetched = ({stateInfo, usersList}) => ({type: STATE_INFO_FETCHED, stateInfo, usersList});

export const FETCH_SURVEYS = 'FETCH_SURVEYS';
export const SURVEYS_FETCHED = 'SURVEYS_FETCHED';

export const fetchSurveys = (searchParams, skip) => ({type: FETCH_SURVEYS, searchParams, skip});
export const surveysFetched = (surveysAddressList, surveysSize) =>
    ({type: SURVEYS_FETCHED, surveysAddressList, surveysSize});

export const FETCH_SURVEY = 'FETCH_SURVEY';
export const SURVEY_FETCHED = 'SURVEY_FETCHED';

export const fetchSurvey = (id, stateId) => ({type: FETCH_SURVEY, id, stateId});
export const surveyFetched = surveyAddress => ({type: SURVEY_FETCHED, surveyAddress});

export const REQUEST_REASSIGN_SURVEY = 'REQUEST_REASSIGN_SURVEY';
export const requestReassignSurvey = (id, pollster) => ({type: REQUEST_REASSIGN_SURVEY, id, pollster});

export const REQUEST_APPROVE_SURVEY = 'REQUEST_APPROVE_SURVEY';
export const requestApproveSurvey = id => ({type: REQUEST_APPROVE_SURVEY, id});

export const REQUEST_REOPEN_SURVEY = 'REQUEST_REOPEN_SURVEY';
export const requestReopenSurvey = id => ({type: REQUEST_REOPEN_SURVEY, id});

export const ACTION_SUCCEEDED = 'ACTION_SUCCEEDED';
export const CLEAR_SUCCEEDED = 'CLEAR_SUCCEEDED';
export const actionSucceeded = (surveyAddress, err) => ({type: ACTION_SUCCEEDED, surveyAddress, err});
export const clearSucceeded = () => ({type: CLEAR_SUCCEEDED});

export const SET_REVIEW_FILTERS = 'SET_REVIEW_FILTERS';
export const setReviewFilters = searchParams => ({type: SET_REVIEW_FILTERS, searchParams});

export const CLEAR_SURVEYS = 'CLEAR_SURVEYS';
export const clearSurveys = () => ({type: CLEAR_SURVEYS});
