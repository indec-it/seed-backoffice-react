import {combineReducers} from 'redux';

import assign from './assign';
import error from './error';
import log from './log';
import fieldMaterials from './fieldMaterial';
import monitoring from './monitoring';
import pollsters from './pollsters';
import review from './review';
import session from './session';
import user from './user';

export default combineReducers({
    assign, error, fieldMaterials, log, monitoring, pollsters, review, session, user
});
