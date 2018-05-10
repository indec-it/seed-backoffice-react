import {AN_ERROR_OCCURRED, CLEAR_ERROR} from '../actions';

const defaultState = {anErrorOccurred: false, errorMsg: null};

export default function session(state = defaultState, action) {
    switch (action.type) {
        case AN_ERROR_OCCURRED:
            /* eslint no-console: 0 */
            console.log(`%c !!! ${action.error.errorMsg} !!!`, 'color: #df0101; font-size: 15px;');
            return {...state, anErrorOccurred: action.error.anErrorOccurred, errorMsg: action.error.errorMsg};
        case CLEAR_ERROR:
            return {...state, ...defaultState};
        default:
            return state;
    }
}
