import {
    REGIONAL_INFO_FETCHED,
    SAVE_REGIONAL_ASSIGN,
    SAVE_SUCCESS,
    ASSIGN_LEVEL_FETCHED,
    FETCH_ASSIGN_LEVEL,
    SUBMIT_ASSIGN,
    CLEAR_ASSIGN_LEVEL,
    CLEAR_SUCCESS
} from '../actions/assign';

export default function assign(state = {
    saving: false, loading: false, info: null, success: false
}, action) {
    switch (action.type) {
        case FETCH_ASSIGN_LEVEL:
            return {...state, loading: true, info: null};
        case REGIONAL_INFO_FETCHED:
            return {...state, regional: action.regional};
        case SAVE_REGIONAL_ASSIGN:
        case SUBMIT_ASSIGN:
            return {...state, saving: true, success: false};
        case SAVE_SUCCESS:
            return {
                ...state,
                saving: false,
                success: true,
                loading: false
            };
        case ASSIGN_LEVEL_FETCHED:
            return {...state, loading: false, info: action.info};
        case CLEAR_ASSIGN_LEVEL:
            return {...state, info: null};
        case CLEAR_SUCCESS:
            return {...state, success: false};
        default:
            return state;
    }
}
