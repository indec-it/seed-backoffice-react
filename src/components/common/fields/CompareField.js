import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Label, Input, FormGroup, FormFeedback
} from 'reactstrap';

import ValidatorService from '../../../services/validator';

class CompareField extends Component {
    static propTypes = {
        control: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        compareValue: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired,
            PropTypes.object.isRequired
        ]).isRequired,
        onChange: PropTypes.func.isRequired,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        type: PropTypes.string.isRequired
    };

    static defaultProps = {
        maxLength: 50,
        minLength: 2
    };

    constructor(props) {
        super(props);
        this.state = {dirty: false};
    }

    validateInput() {
        if (!this.state.dirty) {
            return null;
        }
        const {
            value,
            maxLength,
            minLength,
            compareValue
        } = this.props;
        return ValidatorService.validateCompare(value, compareValue, maxLength, minLength) ? 'success' : 'error';
    }

    handleChange({target}) {
        if (this.props.value === target.value) {
            return;
        }
        this.setState({dirty: true});
        this.props.onChange({target});
    }

    render() {
        const {
            control,
            label,
            value,
            maxLength,
            minLength,
            type
        } = this.props;
        return (
            <FormGroup controlId={control} validationState={this.validateInput()}>
                <Label>
                    {label}
                </Label>
                <Input
                    type={type}
                    value={value}
                    required
                    maxLength={maxLength}
                    minLength={minLength}
                    onChange={e => this.handleChange(e)}
                />
                <FormFeedback/>
            </FormGroup>
        );
    }
}

export default CompareField;
