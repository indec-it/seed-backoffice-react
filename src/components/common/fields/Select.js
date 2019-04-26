import React from 'react';
import PropTypes from 'prop-types';
import Select, {components} from 'react-select';
import {
    Tooltip
} from 'reactstrap';

const customComponents = {
    NoOptionsMessage: props => (
        <Tooltip content="noMessageOption">
            <components.NoOptionsMessage {...props}>
            No se encontraron resultados&nbsp;
            </components.NoOptionsMessage>
            &nbsp;
        </Tooltip>
    )
};

const SelectInput = ({
    defaultOption,
    disabled,
    filterOption,
    getValue,
    onChange,
    onInputChange,
    options,
    placeholder,
    value
}) => (
    <Select
        value={getValue ? getValue(value, options) : value}
        defaultValue={defaultOption ? {value: '', label: '[Todos]'} : false}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        components={customComponents}
        filterOption={filterOption}
        isSearchable
        isClearable
        isDisabled={disabled}
        placeholder={placeholder}
        clearValueText="Limpiar Filtro"
    />
);

SelectInput.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onInputChange: PropTypes.func,
    getValue: PropTypes.func,
    defaultOption: PropTypes.bool,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    filterOption: PropTypes.oneOfType([
        PropTypes.any
    ])
};

SelectInput.defaultProps = {
    defaultOption: false,
    placeholder: '[Seleccione]',
    value: '',
    onInputChange: null,
    getValue: null,
    disabled: false,
    filterOption: null
};

export default SelectInput;
