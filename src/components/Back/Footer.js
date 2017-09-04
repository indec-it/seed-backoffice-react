/* global VERSION */
import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import logo from '../../images/logo-footer.png';

const Footer = () => (
    <footer className="hidden-print">
        <Grid>
            <Row>
                <Col sm={4}>
                    <div className="texts">Seed Backoffice</div>
                    <div className="version">Version {VERSION}</div>
                </Col>
                <Col sm={4} className="text-center">
                    Mesa de ayuda
                    <br/>
                    (011) 4349-9760/61/62/63/64
                </Col>
                <Col sm={4} className="text-right">
                    <Image src={logo}/>
                </Col>
            </Row>
        </Grid>
    </footer>
);

export default Footer;
