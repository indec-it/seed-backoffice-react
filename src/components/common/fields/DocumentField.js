import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import ValidatorService from '../../../services/validator';

class DocumentField extends Component {
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
        return ValidatorService.validateDocument(this.props.value) ? 'success' : 'error';
    }

    handleChange({target}) {
        if (this.props.value === target.value) {
            return;
        }
        this.props.onChange({target});
    }

    render() {
        const {control, label, value} = this.props;
        return (
            <FormGroup controlId={control} validationState={this.validateInput()}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type="text"
                    value={value}
                    required
                    minLength={7}
                    maxLength={8}
                    onChange={e => this.handleChange(e)}
                />
                <FormControl.Feedback/>
            </FormGroup>
        );
    }
}

export default DocumentField;
