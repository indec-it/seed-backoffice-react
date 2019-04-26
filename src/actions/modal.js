export const MODAL_SHOW_REQUESTED = 'MODAL_SHOW_REQUESTED';

export const requestedShowModal = (title, body, buttons) => ({
    type: MODAL_SHOW_REQUESTED, body, buttons, title
});

export const MODAL_HIDE_REQUESTED = 'MODAL_HIDE_REQUESTED';

export const requestedHideModal = () => ({type: MODAL_HIDE_REQUESTED});
