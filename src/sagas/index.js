import {takeEvery, all} from 'redux-saga/effects';

// Constants
import {
    SESSION_REQUESTED,
    USER_FETCH_REQUESTED,
    USERS_FETCH_REQUESTED,
    USERS_FIND_REQUESTED,
    USER_SAVE_REQUESTED,
    FETCH_LOGIN_REQUESTED,
    USERS_VALIDATE_REQUESTED
} from '../actions';

import {
    SAMPLE_FETCH_REQUESTED
} from '../actions/sample';

// Sagas Functions
import {
    fetchUsers,
    findUser,
    findUsers,
    saveUser,
    session,
    fetchLoginRequested,
    userValidate
} from './user';

import {
    fetchSample
} from './sample'


export default function* root() {
    yield all([
        takeEvery(USERS_FETCH_REQUESTED, fetchUsers),
        takeEvery(USERS_FIND_REQUESTED, findUsers),
        takeEvery(USER_FETCH_REQUESTED, findUser),
        takeEvery(USER_SAVE_REQUESTED, saveUser),
        takeEvery(SESSION_REQUESTED, session),
        takeEvery(FETCH_LOGIN_REQUESTED, fetchLoginRequested),
        takeEvery(USERS_VALIDATE_REQUESTED, userValidate),
        takeEvery(SAMPLE_FETCH_REQUESTED, fetchSample)
    ]);
}
