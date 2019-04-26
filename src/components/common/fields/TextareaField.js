import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Label, Input, FormGroup, FormFeedback
} from 'reactstrap';
import {size} from 'lodash';
import ValidatorService from '../../../services/validator';

class TextareaField extends Component {
    static propTypes = {
        control: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
        // eslint-disable-next-line
        onChange: PropTypes.func.isRequired,
        minLength: PropTypes.number,
        maxLength: PropTypes.number
    };

    static defaultProps = {
        label: null,
        maxLength: 250,
        minLength: 2
    };

    constructor(props) {
        super(props);
        this.state = {dirty: false};
    }

    validateInput() {
        const {dirty} = this.state;
        if (!dirty) {
            return null;
        }
        const {value, maxLength, minLength} = this.props;
        return ValidatorService.validateText(value, maxLength, minLength) ? 'success' : 'error';
    }

    handleChange({target}) {
        const {props} = this;
        if (props.value === target.value) {
            return;
        }
        this.setState({dirty: true});
        props.onChange({target});
    }

    render() {
        const {
            control,
            label,
            value,
            maxLength,
            minLength
        } = this.props;
        return (
            <FormGroup controlId={control} validationState={this.validateInput()}>
                {label && (
                    <Label>
                        {label}
                    </Label>
                )}
                <Input
                    componentClass="textarea"
                    value={value}
                    required
                    maxLength={maxLength}
                    minLength={minLength}
                    onChange={e => this.handleChange(e)}
                />
                <FormFeedback/>
                <small>
                    Quedan
                    &nbsp;
                    {maxLength - size(value)}
                    &nbsp;
                        caracter(es) disponibles.
                </small>
            </FormGroup>

        );
    }
}

export default TextareaField;
