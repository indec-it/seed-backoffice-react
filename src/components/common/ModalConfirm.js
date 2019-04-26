import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faBan} from '@fortawesome/free-solid-svg-icons';

/**
 * @param {Object} Props
 * @param {String?} Props.message
 * @param {String?} Props.title
 * @param {Function?} Props.onAccept
 * @param {Function} Props.onDismiss
 * @param {React.ReactElement?} Props.children
 * @param {Boolean?} Props.large
 */
const ModalConfirm = ({
    message,
    title,
    onAccept,
    onDismiss,
    children,
    large
}) => (
    <Modal
        isOpen
        centered
        toggle={onDismiss}
        size={large ? 'lg' : null}
    >
        <ModalHeader toggle={onDismiss}>
            {title}
        </ModalHeader>
        <ModalBody >
            {message}
            {children}
        </ModalBody>
        <ModalFooter>
            {onAccept && (
                <Button onClick={onAccept} color="primary">
                    <FontAwesomeIcon icon={faCheck}/>
                    &nbsp;Confirmar
                </Button>
            )}
            <Button onClick={onDismiss}>
                <FontAwesomeIcon icon={faBan}/>
                &nbsp;Cancelar
            </Button>
        </ModalFooter>
    </Modal>
);

ModalConfirm.propTypes = {
    onDismiss: PropTypes.func.isRequired,
    message: PropTypes.string,
    onAccept: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.element,
    large: PropTypes.bool
};

ModalConfirm.defaultProps = {
    title: 'Confirme Acción',
    message: null,
    children: null,
    onAccept: null,
    large: false
};

export default ModalConfirm;
