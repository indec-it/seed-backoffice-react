import {call, put} from 'redux-saga/effects';
import {isEmpty} from 'lodash';

import {
    notifySaveUserSucceeded,
    receiveUsers,
    receiveUser,
    receiveFindUsers,
    receiveSession,
    anErrorOccurred,
    succeededValidateUser,
    clearError
} from '../actions';
import UserService from '../services/user';
import {User} from '../model';

export function* fetchUsers({skip}) {
    yield put(clearError());
    try {
        const {result, size, total} = yield call(UserService.fetch, skip);
        yield put(receiveUsers(result, size, total));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
    }
}

export function* findUsers({term, keyLabel}) {
    yield put(clearError());
    try {
        const users = yield call(UserService.search, term);
        yield put(receiveFindUsers(users, keyLabel));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
    }
}

export function* findUser({id}) {
    yield put(clearError());
    try {
        const user = yield call(UserService.find, id);
        yield put(receiveUser(user));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
    }
}

export function* saveUser({user}) {
    yield put(clearError());
    try {
        if (!isEmpty(user._id)) {
            yield call(UserService.saveUser, user);
        } else {
            yield call(UserService.newUser, user);
        }
        yield fetchUsers();
        yield put(notifySaveUserSucceeded());
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
    }
}
export function* session() {
    try {
        const {profile} = yield call(UserService.session);
        yield put(receiveSession(new User(profile)));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
        yield put(receiveSession({}));
    }
}

export function* fetchLoginRequested({user, password}) {
    try {
        const profile = yield call(UserService.login, user, password);
        yield put(receiveSession(new User(profile)));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
        yield put(receiveSession(new User()));
    }
}

export function* userValidate({email, username}) {
    try {
        const {errors} = yield call(UserService.validate, email, username);
        yield put(succeededValidateUser(errors));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
        yield put(receiveSession(new User()));
    }
}
