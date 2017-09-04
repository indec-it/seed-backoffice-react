import {call, put} from 'redux-saga/effects';
import {receiveLogs} from '../actions';
import LogService from '../services/log';

// eslint-disable-next-line import/prefer-default-export
export function* fetchLogs() {
    const logs = yield call(LogService.fetch);
    yield put(receiveLogs(logs));
}
