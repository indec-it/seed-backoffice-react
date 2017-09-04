export const USERS_FETCH_REQUESTED = 'USERS_FETCH_REQUESTED';
export const USERS_FETCH_SUCCEEDED = 'USERS_FETCH_SUCCEEDED';

export function requestUsers() {
    return {type: USERS_FETCH_REQUESTED};
}

export function receiveUsers(users) {
    return {type: USERS_FETCH_SUCCEEDED, users};
}

export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED';

export function requestUser(id) {
    return {type: USER_FETCH_REQUESTED, id};
}

export function receiveUser(user) {
    return {type: USER_FETCH_SUCCEEDED, user};
}

export const USER_SAVE_REQUESTED = 'USER_SAVE_REQUESTED';
export const USER_SAVE_SUCCEEDED = 'USER_SAVE_SUCCEEDED';

export function requestSaveUser(user) {
    return {type: USER_SAVE_REQUESTED, user};
}

export const LOGS_FETCH_REQUESTED = 'LOGS_FETCH_REQUESTED';
export const LOGS_FETCH_SUCCEEDED = 'LOGS_FETCH_SUCCEEDED';

export function requestLogs() {
    return {type: LOGS_FETCH_REQUESTED};
}

export function receiveLogs(logs) {
    return {type: LOGS_FETCH_SUCCEEDED, logs};
}
