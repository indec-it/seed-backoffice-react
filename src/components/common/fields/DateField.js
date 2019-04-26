import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';
import DatePicker, {registerLocale} from 'react-datepicker';
import locale from 'date-fns/locale/es';

registerLocale('es', locale);

const DateInput = ({
    answer,
    label,
    minDate,
    maxDate,
    format,
    onChange,
    disabled
}) => (label ? (
    <Row>
        <Col sm="7">
            {label}
        </Col>
        <Col sm="5">
            <DatePicker
                showYearDropdown
                showMonthDropdown
                isClearable
                key="es"
                disabled={disabled}
                locale="es"
                minDate={minDate}
                maxDate={maxDate}
                selected={answer}
                onChange={onChange}
                dateFormat={format}
            />
        </Col>
    </Row>
) : (
    <DatePicker
        showYearDropdown
        showMonthDropdown
        isClearable
        key="es"
        locale="es"
        minDate={minDate}
        maxDate={maxDate}
        selected={answer}
        onChange={onChange}
        dateFormat={format}
        disabled={disabled}
    />
));

DateInput.displayName = 'dateInput';
DateInput.propTypes = {
    format: PropTypes.string,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};
DateInput.defaultProps = {
    format: 'dd/MM/YYYY',
    minDate: new Date(),
    maxDate: null,
    answer: null,
    label: null,
    disabled: false,
    onChange: null
};
export default DateInput;
