import {call, put} from 'redux-saga/effects';

import {receiveSample} from '../actions/sample'
import SampleService from '../services/sample';

export function* fetchSample({skip}) {
    const {result, size, total} = yield call(SampleService.sample, skip);
    yield put(receiveSample(result, size, total));
}
