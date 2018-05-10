/* eslint no-param-reassign: 0 */
import {call, put} from 'redux-saga/effects';
import {reduce} from 'lodash';
import {anErrorOccured, clearError} from '../actions/';
import {regionalInfoFetched, saveSuccess, assignLevelFetched} from '../actions/assign';
import AssignService from '../services/assign';

export function* fetchRegionalInfo() {
    const regionalInto = yield call(AssignService.getRegionalAssign);
    if (regionalInto.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: regionalInto.error}));
    } else {
        yield put(regionalInfoFetched(regionalInto));
    }
}

export function* saveRegionalInfo(regionalInfo) {
    yield put(clearError());
    const status = yield call(AssignService.saveRegionalAssign, regionalInfo.assingRegional);
    if (status.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: status.error}));
    } else {
        yield fetchRegionalInfo();
        yield put(saveSuccess(status));
    }
}

export function* fetchAssignLevel({level, state}) {
    yield put(clearError());
    const info = yield call(AssignService.fetchAssignLevel, level, state);
    if (info.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: info.error}));
    } else {
        info.regionalInfo = reduce(info.regionalInfo, (result, value) => {
            const {
                stateId, ups, area, segment, _id, subCoordinator, supervisor, pollster
            } = value;
            let filterKey = null;
            if (_id) {
                filterKey = _id;
            } else {
                filterKey = stateId;
                if (ups) {
                    filterKey = `${filterKey}${ups}`;
                }
                if (area) {
                    filterKey = `${filterKey}${area}`;
                }
                if (segment) {
                    filterKey = `${filterKey}${segment}`;
                }
                if (subCoordinator) {
                    filterKey = `${filterKey}${subCoordinator}`;
                }
                if (supervisor) {
                    filterKey = `${filterKey}${supervisor}`;
                }
                if (pollster) {
                    filterKey = `${filterKey}${pollster}`;
                }
            }
            if (result[filterKey]) {
                result[filterKey].total += value.total;
                if (value.subSample === 1 || result[filterKey].subSample === 1) {
                    result[filterKey].subSample = 1;
                } else {
                    result[filterKey].subSample = 0;
                }
            } else {
                result[filterKey] = value;
            }
            return result;
        }, {});
        yield put(assignLevelFetched(info));
    }
}

export function* saveAssign({assign}) {
    yield put(clearError());
    const status = yield call(AssignService.saveAssign, assign);
    if (status.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: status.error}));
    } else {
        yield put(saveSuccess(status));
    }
}
