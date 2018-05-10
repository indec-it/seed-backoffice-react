import {
    FIELDS_MATERIALS_FETCH_REQUESTED,
    FIELDS_MATERIALS_FETCH_SUCCEEDED
} from '../actions/fieldMaterials';


export default function fieldMaterials(state = {loading: false}, action) {
    switch (action.type) {
        case FIELDS_MATERIALS_FETCH_REQUESTED:
            return {...state, loading: true};
        case FIELDS_MATERIALS_FETCH_SUCCEEDED:
            return {...state, fieldMaterials: action.fieldMaterials, loading: false};
        default:
            return state;
    }
}
