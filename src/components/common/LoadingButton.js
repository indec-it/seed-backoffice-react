import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const LoadingButton = ({label}) => (
    <div className="loading">
        <FontAwesome name="spinner" pulse/> {label}
    </div>
);

LoadingButton.propTypes = {
    label: PropTypes.string
};

LoadingButton.defaultProps = {
    label: 'Cargando...'
};

export default LoadingButton;
