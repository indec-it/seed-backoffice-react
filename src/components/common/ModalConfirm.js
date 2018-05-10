import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

const ModalConfirm = ({
    message, title, onAccept, onDismiss
}) => (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onAccept} bsStyle="success">Confirmar</Button>
            <Button onClick={onDismiss} bsStyle="danger">Cancelar</Button>
        </Modal.Footer>
    </Modal>
);

ModalConfirm.propTypes = {
    message: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    title: PropTypes.string
};

ModalConfirm.defaultProps = {
    title: 'Confirme Acción'
};

export default ModalConfirm;
