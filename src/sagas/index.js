import {takeEvery} from 'redux-saga';
import {
    USERS_FETCH_REQUESTED,
    USER_FETCH_REQUESTED,
    LOGS_FETCH_REQUESTED
} from '../actions';
import {fetchUsers, findUser} from './user';
import {fetchLogs} from './log';


export default function* root() {
    yield [
        takeEvery(USERS_FETCH_REQUESTED, fetchUsers),
        takeEvery(USER_FETCH_REQUESTED, findUser),
        takeEvery(LOGS_FETCH_REQUESTED, fetchLogs)
    ];
}
