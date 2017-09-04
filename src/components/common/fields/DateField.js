import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import DateUtilsService from '../../../services/dateUtils';
import ValidatorService from '../../../services/validator';

const minDate = moment().subtract(90, 'years');
const maxDate = moment().subtract(17, 'years');

class DateField extends Component {
    static propTypes = {
        control: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    validateInput() {
        if (!this.props.value) {
            return null;
        }
        return ValidatorService.validateDate(this.props.value) ? 'success' : 'error';
    }

    handleChange(date) {
        const value = date.toISOString();
        if (this.props.value === value) {
            return;
        }
        this.props.onChange({target: {value, id: this.props.control}});
    }

    render() {
        const {control, label, value} = this.props;
        return (
            <FormGroup controlId={control} validationState={this.validateInput()}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass={DatePicker}
                    selected={value ? moment(value) : null}
                    onChange={date => this.handleChange(date)}
                    dateFormat={DateUtilsService.DATE_FORMAT}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Haga click para seleccionar"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    withPortal
                />
            </FormGroup>
        );
    }
}

export default DateField;
