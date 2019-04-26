import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Label, Input, FormGroup, FormFeedback
} from 'reactstrap';

import ValidatorService from '../../../services/validator';

class TextField extends Component {
    static propTypes = {
        control: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        password: PropTypes.bool
    };

    static defaultProps = {
        maxLength: 50,
        minLength: 2,
        password: false,
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {dirty: false};
    }

    validateInput() {
        if (!this.state.dirty) {
            return null;
        }
        const {value, maxLength, minLength} = this.props;
        return ValidatorService.validateText(value, maxLength, minLength) ? 'success' : 'error';
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
            password,
            disabled
        } = this.props;
        return (
            <FormGroup
                controlId={control}
                validationState={this.validateInput()}
            >
                <Label>
                    &nbsp;
                    {label}
                    &nbsp;
                </Label>
                    &nbsp;
                <Input
                    type={password ? 'password' : 'text'}
                    value={value}
                    required
                    disabled={disabled}
                    maxLength={maxLength}
                    minLength={minLength}
                    onChange={e => this.handleChange(e)}
                />
                &nbsp;
                <FormFeedback/>
            </FormGroup>
        );
    }
}

export default TextField;
