import {call, put} from 'redux-saga/effects';

import {
    notifySaveUserSucceeded,
    receiveUsers,
    receiveUser,
    receiveFindUsers,
    receiveSession,
    anErrorOccured,
    clearError
} from '../actions';
import UserService from '../services/user';

export function* fetchUsers() {
    yield put(clearError());
    const users = yield call(UserService.fetch);
    if (users.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: users.error}));
    } else {
        yield put(receiveUsers(users));
    }
}

export function* findUsers() {
    yield put(clearError());
    const users = yield call(UserService.search);
    if (users.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: users.error}));
    } else {
        yield put(receiveFindUsers(users));
    }
}

export function* findUser({id}) {
    yield put(clearError());
    const user = yield call(UserService.findById, id);
    if (user.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: user.error}));
    } else {
        yield put(receiveUser(user));
    }
}

export function* saveUser({users}) {
    yield put(clearError());
    const data = yield call(UserService.save, users);
    if (data.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: data.error}));
    } else {
        yield findUsers();
        yield put(notifySaveUserSucceeded());
    }
}
export function* session() {
    yield put(clearError());
    const profile = yield call(UserService.profile);
    if (profile.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: profile.error}));
    } else {
        yield put(receiveSession(profile));
    }
}
