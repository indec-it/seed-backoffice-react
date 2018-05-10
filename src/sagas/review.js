import {delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import {anErrorOccured, clearError} from '../actions/';
import {
    actionSucceeded,
    clearSucceeded,
    statesFetched,
    stateInfoFetched,
    surveysFetched,
    surveyFetched
} from '../actions/review';

import ReviewService from '../services/review';

export function* fetchStates() {
    yield put(clearError());
    const {states, error} = yield call(ReviewService.getStates);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        yield put(statesFetched(states));
    }
}

export function* fetchStateInfo({stateId}) {
    yield put(clearError());
    const {stateInfo, users, error} = yield call(ReviewService.getStateInfo, stateId);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        const usersList = users.map(user => ({value: user._id, label: `${user.surname}, ${user.name}`, _id: user._id}));
        yield put(stateInfoFetched({stateInfo, usersList}));
    }
}

export function* fetchSurveys({searchParams, skip}) {
    yield put(clearError());
    const {surveysAddresses, surveysSize, error} = yield call(ReviewService.fetchSurveys, searchParams, skip);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        yield put(surveysFetched(surveysAddresses, surveysSize));
    }
}

export function* fetchSurvey({id, stateId}) {
    yield put(clearError());
    const {surveyAddress, error} = yield call(ReviewService.fetchSurvey, id, stateId);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        yield put(surveyFetched(surveyAddress));
    }
}

export function* requestReassignSurvey({id, pollster}) {
    yield put(clearError());
    const {surveyAddress, err, error} = yield call(ReviewService.requestReassignSurvey, id, pollster);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        yield put(actionSucceeded(surveyAddress, err));
        yield call(delay, 4000);
        yield put(clearSucceeded());
    }
}

export function* requestApproveSurvey({id}) {
    const {surveyAddress, err, error} = yield call(ReviewService.requestApproveSurvey, id);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        yield put(actionSucceeded(surveyAddress, err));
        yield call(delay, 4000);
        yield put(clearSucceeded());
    }
}

export function* requestReopenSurvey({id}) {
    yield put(clearError());
    const {surveyAddress, err, error} = yield call(ReviewService.requestReopenSurvey, id);
    if (error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: error}));
    } else {
        yield put(actionSucceeded(surveyAddress, err));
        yield call(delay, 4000);
        yield put(clearSucceeded());
    }
}
