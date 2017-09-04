/* global window */
import React, {Component} from 'react';
import {Grid, Row, Col, Button, Form, FormGroup, FormControl} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import SignInService from '../../services/signIn';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await SignInService.login(this.state.username, this.state.password);
            if (result.success) {
                window.location = '/back.html';
            }
        } catch (ex) {
            this.setState({invalidLogin: true});
        }
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={4} smOffset={4}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <FormGroup>
                                <h1><FontAwesome name="chevron-circle-right"/> Iniciar sesión</h1>
                            </FormGroup>
                            <FormGroup controlId="username">
                                <FormControl
                                    type="text"
                                    value={this.state.username}
                                    placeholder="Usuario"
                                    required
                                    onChange={e => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <FormControl
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    required
                                    onChange={e => this.handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" bsStyle="primary">
                                    <FontAwesome name="power-off"/> Ingresar
                                </Button>
                            </FormGroup>
                            {this.state.invalidLogin && <FormGroup>
                                <span>Usuario o password no válidos.</span>
                            </FormGroup>}
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default SignIn;
