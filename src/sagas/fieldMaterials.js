import {call, put} from 'redux-saga/effects';
import {anErrorOccured, clearError} from '../actions/';
import {FieldMaterialsSucceeded} from '../actions/fieldMaterials';
import FieldMaterialsService from '../services/fieldMaterials';

// eslint-disable-next-line import/prefer-default-export
export function* fetchFieldMaterials({filters}) {
    yield put(clearError());
    const fieldMaterial = yield call(FieldMaterialsService.fieldMaterialsRequest, filters);
    if (fieldMaterial.error) {
        yield put(anErrorOccured({anErrorOccurred: true, errorMsg: fieldMaterial.error}));
    } else {
        yield put(FieldMaterialsSucceeded(fieldMaterial));
    }
}
