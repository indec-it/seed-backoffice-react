import {call, put} from 'redux-saga/effects';

import {anErrorOccured, clearError} from '../actions/';
import {
    generalMonitoringFetched,
    responseMonitoringFetched
} from '../actions/monitoring';

import MonitoringService from '../services/monitoring';

export function* fetchGeneralMonitoring() {
    yield put(clearError());
    const generalMonitoring = yield call(MonitoringService.fetchGeneralMonitoring);
    if (generalMonitoring.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: generalMonitoring.error}));
    } else {
        yield put(generalMonitoringFetched(generalMonitoring));
    }
}

export function* fetchResponseMonitoring({filters}) {
    yield put(clearError());
    const responseMonitoring = yield call(MonitoringService.fetchResponseMonitoring, filters);
    if (responseMonitoring.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: responseMonitoring.error}));
    } else {
        yield put(responseMonitoringFetched(responseMonitoring));
    }
}
