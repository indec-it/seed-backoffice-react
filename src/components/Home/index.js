import React from 'react';
import {Col, Grid, Row} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Home = () => (
    <Grid>
        <Row>
            <Col sm={12}>
                <h3>
                    <FontAwesome name="chevron-circle-right"/>
                    Bienvenido al sistema de gestión
                </h3>
            </Col>
        </Row>
    </Grid>
);

export default Home;
