/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Grid, Row, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {includes} from 'lodash';

import {roles} from '../../constants';
import {User} from '../../model';
import {getVersion} from '../../services/utils';

class Home extends Component {
    static propTypes = {
        profile: PropTypes.instanceOf(User)
    };

    static defaultProps = {
        profile: null
    };

    constructor(props) {
        super(props);
        this.state = {
            version: null,
            date: null
        };
    }

    async componentDidMount() {
        const {app: {version, date}} = await getVersion();
        this.setState({version, date});
    }
    
    render () {
        const {profile} = this.props;
        const {version, date} = this.state;
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>
                            <FontAwesome name="chevron-circle-right"/>
                            Bienvenido al sistema de gestión
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <h4 className="text-center">Lista de Instructivos</h4>
                        <br/>
                        <Button
                            target="_blank"
                            href=""
                            className="btn-group-justified"
                        >
                        Instructivo de uso de la Tablet
                        </Button>
                        <br/>
                        {profile && !includes(profile.roles, roles.POLLSTER) &&
                            <Button
                                target="_blank"
                                href=""
                                className="btn-group-justified"
                            >
                                Instructivo de uso Sistema de Gestión
                            </Button>
                        }
                    </Col>
                    <Col md={6} mdOffset={3}>
                        <Row>
                            <Col sm={6} className="text-center">
                                <h4>Versión App Tablet</h4>
                            </Col>
                            <Col sm={6} className="text-center">
                                <h4>Ultima Actualización</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="text-center">
                                <code>{version || 'Falta Versión'}</code>
                            </Col>
                            <Col sm={6} className="text-center">
                                <code>{date || 'Falta Fecha'}</code>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    };
}

export default connect(state => state.session)(Home);
