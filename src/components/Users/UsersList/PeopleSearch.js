import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormControl, FormGroup} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {State} from '../../../model';

class PeopleSearch extends Component {
    static propTypes = {
        states: PropTypes.arrayOf(PropTypes.instanceOf(State)).isRequired,
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        searchTerms: PropTypes.string.isRequired
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    render() {
        const {searchTerms, states, onChange, onSubmit} = this.props;
        return (
            <Form inline onSubmit={e => this.handleSubmit(e)}>
                <FormGroup>
                    <FormControl
                        componentClass="select"
                        onChange={e => onSubmit(e.target.value)}
                    >
                        <option value={0}>[TODAS]</option>
                        {states.map(state => (
                            <option value={state._id} key={state._id}>{state.name}</option>
                        ))}
                    </FormControl>
                </FormGroup>
                &nbsp;
                <FormGroup>
                    <FormControl
                        type="text"
                        value={searchTerms}
                        onChange={e => onChange(e.target.value)}
                        placeholder="Buscar..."
                    />
                </FormGroup>
                &nbsp;
                <Button type="submit">
                    <FontAwesome name="search"/>
                </Button>
            </Form>
        );
    }
}

export default PeopleSearch;
