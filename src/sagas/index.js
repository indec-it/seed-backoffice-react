import {takeEvery} from 'redux-saga/effects';

import {
    LOGS_FETCH_REQUESTED,
    SESSION_REQUESTED,
    USER_FETCH_REQUESTED,
    USERS_FETCH_REQUESTED,
    USERS_FIND_REQUESTED,
    USER_SAVE_REQUESTED
} from '../actions';
import {FETCH_REGIONAL_INFO, SAVE_REGIONAL_ASSIGN, FETCH_ASSIGN_LEVEL, SUBMIT_ASSIGN} from '../actions/assign';
import {FETCH_GENERAL_MONITORING, FETCH_RESPONSE_MONITORING} from '../actions/monitoring';
import {
    FETCH_STATES,
    FETCH_STATE_INFO,
    FETCH_SURVEYS,
    FETCH_SURVEY,
    REQUEST_APPROVE_SURVEY,
    REQUEST_REASSIGN_SURVEY,
    REQUEST_REOPEN_SURVEY
} from '../actions/review';
import {FIELDS_MATERIALS_FETCH_REQUESTED} from '../actions/fieldMaterials';
import {FETCH_POLLSTERS, FETCH_POLLSTER} from '../actions/pollsters';

import {fetchUsers, findUser, findUsers, saveUser, session} from './user';
import {fetchLogs} from './log';
import {fetchRegionalInfo, saveRegionalInfo, fetchAssignLevel, saveAssign} from './assign';
import {fetchFieldMaterials} from './fieldMaterials';
import {fetchGeneralMonitoring, fetchResponseMonitoring} from './monitoring';
import {
    fetchStates,
    fetchStateInfo,
    fetchSurveys,
    fetchSurvey,
    requestApproveSurvey,
    requestReassignSurvey,
    requestReopenSurvey
} from './review';
import {fetchPollsters, fetchPollster} from './pollsters';

export default function* root() {
    yield [
        takeEvery(USERS_FETCH_REQUESTED, fetchUsers),
        takeEvery(USERS_FIND_REQUESTED, findUsers),
        takeEvery(USER_FETCH_REQUESTED, findUser),
        takeEvery(LOGS_FETCH_REQUESTED, fetchLogs),
        takeEvery(USER_SAVE_REQUESTED, saveUser),
        takeEvery(SESSION_REQUESTED, session),
        takeEvery(FETCH_REGIONAL_INFO, fetchRegionalInfo),
        takeEvery(SAVE_REGIONAL_ASSIGN, saveRegionalInfo),
        takeEvery(SUBMIT_ASSIGN, saveAssign),
        takeEvery(FETCH_ASSIGN_LEVEL, fetchAssignLevel),
        takeEvery(FETCH_GENERAL_MONITORING, fetchGeneralMonitoring),
        takeEvery(FETCH_RESPONSE_MONITORING, fetchResponseMonitoring),
        takeEvery(FETCH_STATES, fetchStates),
        takeEvery(FETCH_STATE_INFO, fetchStateInfo),
        takeEvery(FETCH_SURVEYS, fetchSurveys),
        takeEvery(FETCH_SURVEY, fetchSurvey),
        takeEvery(REQUEST_APPROVE_SURVEY, requestApproveSurvey),
        takeEvery(REQUEST_REASSIGN_SURVEY, requestReassignSurvey),
        takeEvery(REQUEST_REOPEN_SURVEY, requestReopenSurvey),
        takeEvery(FIELDS_MATERIALS_FETCH_REQUESTED, fetchFieldMaterials),
        takeEvery(FETCH_POLLSTERS, fetchPollsters),
        takeEvery(FETCH_POLLSTER, fetchPollster)
    ];
}
