import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    Alert
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronCircleRight, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {Loading} from '../common';

import {requestLogin} from '../../actions';

class SignIn extends Component {
    static propTypes = {
        profile: PropTypes.shape({
            usuario: PropTypes.string
        })
    }

    static defaultProps = {
        profile: null
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.profile && props.profile.usuario) {
            return {success: true};
        }
        if (state.requested && (!props.profile || !props.profile.usuario)) {
            return {errorMessage: 'Usuario o Contraseña incorrecto'};
        }

        return null;
    }

    handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        const {props} = this;
        props.requestLogin(username, password);
        // eslint-disable-next-line
        this.setState({ requested: true });
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        const {
            username,
            password,
            errorMessage
        } = this.state;
        const {props} = this;
        return (
            <Container>
                <Row className="align-items-center">
                    <Col sm={{size: 4, offset: 4}}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Row className="align-items-center">
                                <Col sm="12" >
                                    <FormGroup>
                                        <h2 >
                                            <FontAwesomeIcon icon={faChevronCircleRight}/>
                                            &nbsp; Iniciar sesión

                                        </h2>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm="12">
                                    <FormGroup
                                        controlId="username"
                                        className="form-group"
                                    >
                                        <Input
                                            type="text"
                                            id="username"
                                            value={username}
                                            placeholder="Usuario"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm="12">
                                    <FormGroup controlId="password">
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            placeholder="Password"
                                            required
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col sm="12" >
                                    <FormGroup >
                                        <Button
                                            type="submit"
                                            color="primary"
                                        >
                                            <FontAwesomeIcon icon={faPowerOff}/>
                                            &nbsp; Ingresar
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="vertical-margin">
                                <Col sm="12" >
                                    { props.loading && <Loading label="Ingresando..."/> }
                                    {
                                        errorMessage && (
                                            <FormGroup >
                                                <Alert
                                                    color="danger"
                                                    className="text-center"
                                                >
                                                    { errorMessage }
                                                </Alert>
                                            </FormGroup>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    state => state.session,
    dispatch => ({
        requestLogin: (user, password) => dispatch(requestLogin(user, password))
    })
)(SignIn);
