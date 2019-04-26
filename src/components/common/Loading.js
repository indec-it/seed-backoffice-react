import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const Loading = ({label}) => (
    <div className="loading">
        <FontAwesomeIcon icon={faSpinner} pulse/>
        &nbsp;
        {label}
    </div>
);

Loading.propTypes = {
    label: PropTypes.string
};

Loading.defaultProps = {
    label: 'Cargando...'
};

export default Loading;
