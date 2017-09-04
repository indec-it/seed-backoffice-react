import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'react-bootstrap';
import {isNil} from 'lodash';

const YesNoField = ({value, onChange}) => (
    <ButtonGroup>
        <Button active={value === true} onClick={() => onChange(true)}>
            Apto <strong>SI</strong>
        </Button>
        <Button active={value === false} onClick={() => onChange(false)}>
            <strong>NO</strong> apto
        </Button>
        <Button active={isNil(value)} onClick={() => onChange(null)}>
            Dictamen no realizado
        </Button>
    </ButtonGroup>
);

YesNoField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool
};

YesNoField.defaultProps = {
    value: null
};

export default YesNoField;
