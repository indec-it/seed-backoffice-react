import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSpinner,
    faCheckDouble,
    faWindowClose
} from '@fortawesome/free-solid-svg-icons';

/**
 * @param {Object} Props
 * @param {Boolean} Props.loading
 * @param {Boolean} Props.saving
 * @param {Boolean} Props.success
 * @param {Boolean} Props.error
 */
const SaveAlert = ({
    saving,
    loading,
    success,
    error,
    errorLabel
}) => (
    <Fragment>
        {loading && (
            <Alert
                color="info"
                className="text-center"
            >
                <FontAwesomeIcon
                    icon={faSpinner}
                    pulse
                />
                    &nbsp; Cargando
            </Alert>
        )}
        {saving && (
            <Alert
                color="info"
                className="text-center"
            >
                <FontAwesomeIcon
                    icon={faSpinner}
                    pulse
                />
                &nbsp; Guardando
            </Alert>
        )}

        {success && (
            <Alert
                className="text-center"
                color="success"
            >
                <FontAwesomeIcon icon={faCheckDouble}/>
                &nbsp; Guardado con éxito
            </Alert>
        )}
        {error && (
            <Alert
                className="text-center"
                color="danger"
            >
                <FontAwesomeIcon icon={faWindowClose}/>
                &nbsp;&nbsp;
                { errorLabel }
            </Alert>
        )}
    </Fragment>
);

SaveAlert.propTypes = {
    saving: PropTypes.bool,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
    errorLabel: PropTypes.string
};

SaveAlert.defaultProps = {
    saving: false,
    loading: false,
    success: false,
    error: false,
    errorLabel: 'Error en el guardado'
};

export default SaveAlert;
