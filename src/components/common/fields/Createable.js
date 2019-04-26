import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/lib/Creatable';
import {components} from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const customComponents = {
    NoOptionsMessage: props => (
        <strong content="noMessageOption">
            <components.NoOptionsMessage {...props}>
                No se encontraron resultados
            </components.NoOptionsMessage>
        </strong>
    ),
    Placeholder: props => (
        <strong>
            <components.Placeholder {...props}>
                Escriba o seleccione para filtrar
            </components.Placeholder>
        </strong>
    )
};


const creatable = ({
    value, options, onChange, labelKey
}) => (
    <Creatable
        value={value}
        components={customComponents}
        isClearable
        options={options}
        onChange={e => onChange(e)}
        name={labelKey}
        createOptionPosition="first"
        formatCreateLabel={() => (
            <strong>
                {labelKey}
                &nbsp;
                <FontAwesomeIcon icon={faPlusCircle}/>
            </strong>
        )}
    />
);

creatable.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ),
    labelKey: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

creatable.defaultProps = {
    options: [],
    labelKey: 'name'
};

export default creatable;
