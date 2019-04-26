import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Label, Input, FormGroup, FormFeedback
} from 'reactstrap';
import {toNumber, toString} from 'lodash';

import ValidatorService from '../../../services/validator';

const handleKeyPress = e => {
    if (!ValidatorService.validateNumber(e.key)) {
        e.preventDefault();
    }
};

class NumberField extends Component {
    static propTypes = {
        control: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
        ]),
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        value: '',
        maxLength: 20,
        minLength: 2,
        onBlur: null,
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
        return ValidatorService.validateText(toString(value), maxLength, minLength) ? 'success' : 'error';
    }

    handleChange({target}) {
        if (this.props.value === target.value) {
            return;
        }
        this.setState({dirty: true});
        toNumber(target.value);
        this.props.onChange({target});
    }

    render() {
        const {
            control,
            label,
            value,
            maxLength,
            minLength,
            onBlur,
            disabled
        } = this.props;
        return (
            <FormGroup
                controlId={control}
                validationState={this.validateInput()}
            >
                {label && (
                    <Label>
                        {label}
                    </Label>
                )}
                <Input
                    style={
                        {
                            width: '150px'
                        }
                    }
                    type="text"
                    required
                    {... {value, maxLength, minLength}}
                    disabled={disabled}
                    onKeyPress={handleKeyPress}
                    onChange={e => this.handleChange(e)}
                    onBlur={onBlur}
                />
                <FormFeedback/>
            </FormGroup>
        );
    }
}

export default NumberField;
