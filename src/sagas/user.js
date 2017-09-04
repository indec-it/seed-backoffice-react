import {call, put} from 'redux-saga/effects';
import {receiveUsers, receiveUser} from '../actions';
import UserService from '../services/user';

export function* fetchUsers() {
    const users = yield call(UserService.fetch);
    yield put(receiveUsers(users));
}

export function* findUser({id}) {
    const users = yield call(UserService.find, id);
    yield put(receiveUser(users));
}

export function* saveUser({user}) {
    yield call(UserService.save, user);
    // yield put();
}
