import {combineReducers} from 'redux';

import error from './error';
import modal from './modal';
import sample from './sample';
import session from './session';
import user from './user';

export default combineReducers({
    error,
    modal,
    sample,
    session,
    user
});
