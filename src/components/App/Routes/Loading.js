import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

export default () => (
    <h2 className="text-center" style={{marginTop: '10%'}}>
        Inicializando...
        <FontAwesomeIcon icon={faSpinner} pulse/>
    </h2>
);
