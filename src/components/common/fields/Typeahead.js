import React from 'react';
import PropTypes from 'prop-types';
import {Label, FormGroup} from 'reactstrap';
import {identity} from 'lodash';

import Select from './Select';

const handleInputChange = (term, onLoadOptions) => {
    if (/^\d+$/.test(term)) {
        onLoadOptions(term);
    } else if (term.length > 3) {
        onLoadOptions(term);
    }
};

const Typeahead = ({
    control,
    onChange,
    onLoadOptions,
    disabled,
    options,
    label,
    value,
    placeholder
}) => (
    <FormGroup controlId={control}>
        <Label >
            { label }
        </Label>
        <Select
            id={control}
            name={control}
            defaultValue={value}
            filterOption={identity}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            onInputChange={term => handleInputChange(term, onLoadOptions)}
            options={options}
            defaultText="Escriba para buscar"
        />
    </FormGroup>
);

Typeahead.propTypes = {
    control: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    onLoadOptions: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
};

Typeahead.defaultProps = {
    label: '',
    value: '',
    placeholder: 'Escriba para buscar...',
    disabled: false,
    options: []
};

export default Typeahead;
