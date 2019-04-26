import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonGroup} from 'reactstrap';
import {isNil} from 'lodash';

const YesNoField = ({value, onChange}) => (
    <ButtonGroup >
        <Button
            active={value === true}
            onClick={
                () => onChange(true)}
        >
            Apto &nbsp;
            &nbsp;
            <strong >
                SI
                &nbsp;

            </strong>
            &nbsp;

        </Button>
        &nbsp;
        <Button
            active={value === false}
            onClick={
                () => onChange(false)}
        >
            <strong >
                NO
                &nbsp;

            </strong>
            &nbsp;
            &nbsp; apto
            &nbsp;

        </Button>
        &nbsp;
        <Button
            active={isNil(value)}
            onClick={
                () => onChange(null)}
        >
            Dictamen no realizado
            &nbsp;
        </Button>
        &nbsp;

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
