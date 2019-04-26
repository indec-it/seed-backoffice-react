export const USERS_FETCH_REQUESTED = 'USERS_FETCH_REQUESTED';
export const USERS_FETCH_SUCCEEDED = 'USERS_FETCH_SUCCEEDED';
export const USERS_FIND_REQUESTED = 'USERS_FIND_REQUESTED';
export const USERS_FIND_SUCCEEDED = 'USERS_FIND_SUCCEEDED';
export const SESSION_REQUESTED = 'SESSION_REQUESTED';
export const SESSION_RECEIVED = 'SESSION_RECEIVED';

export const requestUsers = skip => ({type: USERS_FETCH_REQUESTED, skip});
export const receiveUsers = (users, size, total) => ({
    type: USERS_FETCH_SUCCEEDED, users, size, total
});

export function requestFindUsers(term, keyLabel) {
    return {type: USERS_FIND_REQUESTED, term, keyLabel};
}

export function receiveFindUsers(findUsers, keyLabel) {
    return {type: USERS_FIND_SUCCEEDED, findUsers, keyLabel};
}

export const USERS_VALIDATE_REQUESTED = 'USERS_VALIDATE_REQUESTED';
export const USERS_VALIDATE_SUCCEEDED = 'USERS_VALIDATE_SUCCEEDED';

export function requestValidateUser(email, username) {
    return {type: USERS_VALIDATE_REQUESTED, email, username};
}

export function succeededValidateUser({email, username}) {
    return {type: USERS_VALIDATE_SUCCEEDED, email, username};
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

export const DELETE_USER_REQUESTED = 'DELETE_USER_REQUESTED';
export const INSERT_USER_REQUESTED = 'INSERT_USER_REQUESTED';

export const SUBMIT_USER_SUCCEEDED = 'SUBMIT_USER_SUCCEEDED';

export const deleteUserRequested = id => ({type: DELETE_USER_REQUESTED, id});
export const insertUserRequested = user => ({type: INSERT_USER_REQUESTED, user});

export const submitUserSucceeded = () => ({type: SUBMIT_USER_SUCCEEDED});


export function notifySaveUserSucceeded() {
    return {type: USER_SAVE_SUCCEEDED};
}

export const LOGS_FETCH_REQUESTED = 'LOGS_FETCH_REQUESTED';
export const LOGS_FETCH_SUCCEEDED = 'LOGS_FETCH_SUCCEEDED';

export function requestLogs() {
    return {type: LOGS_FETCH_REQUESTED};
}

export function receiveLogs(logs) {
    return {type: LOGS_FETCH_SUCCEEDED, logs};
}

export const FETCH_LOGIN_REQUESTED = 'FETCH_LOGIN_REQUESTED';

export function requestLogin(user, password) {
    return {type: FETCH_LOGIN_REQUESTED, user, password};
}

export function requestSession() {
    return {type: SESSION_REQUESTED};
}

export function receiveSession(profile) {
    return {type: SESSION_RECEIVED, profile};
}

export const AN_ERROR_OCCURRED = 'AN_ERROR_OCCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const anErrorOccurred = error => ({type: AN_ERROR_OCCURRED, error});
export const clearError = () => ({type: CLEAR_ERROR});

export const IS_MOBILE = 'IS_MOBILE';
export const setIsMobile = isMobile => ({type: IS_MOBILE, isMobile});
