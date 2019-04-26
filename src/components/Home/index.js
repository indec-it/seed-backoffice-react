/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Container,
    Row,
    ButtonGroup
} from 'reactstrap';

class Home extends Component {
    static propTypes = {
        profile: PropTypes.shape({})
    };

    static defaultProps = {
        profile: null
    };

    constructor(props) {
        super(props);
        const component = null;
        this.state = {
            component
        };
    }

    renderHome() {
        return (
            <Container fluid>
                <Row className="no-padding align-items-center">
                    <Col sm={12} className="no-padding">
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row className="no-padding align-items-center">
                    <Col md={4}>
                        <h4 className="text-center">Lista de Instructivos</h4>
                        <ButtonGroup vertical block>
                        </ButtonGroup>
                    </Col>
                    <Col md={6} mdOffset={2}>
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {
        return (
            <Container fluid>
                {this.renderHome()}
            </Container>
        );
    }
}

export default Home;