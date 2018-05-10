import {call, put} from 'redux-saga/effects';
import {pollstersFetched, pollsterFetched} from '../actions/pollsters';
import PollstersServices from '../services/pollsters';

// eslint-disable-next-line import/prefer-default-export
export function* fetchPollsters({stateId}) {
    const {pollsters} = yield call(PollstersServices.fetchPollsters, stateId);
    yield put(pollstersFetched(pollsters));
}

export function* fetchPollster({id}) {
    const {pollster} = yield call(PollstersServices.fetchPollster, id);
    yield put(pollsterFetched(pollster));
}
