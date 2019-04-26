import {MODAL_HIDE_REQUESTED, MODAL_SHOW_REQUESTED} from '../actions/modal';

export default function modal(state = {show: false}, action) {
    switch (action.type) {
        case MODAL_SHOW_REQUESTED:
            return {
                ...state,
                show: true,
                body: action.body,
                buttons: action.buttons,
                title: action.title
            };
        case MODAL_HIDE_REQUESTED:
            return {...state, show: false};
        default:
            return state;
    }
}
