/* global VERSION */
import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import logo from '../../images/logo-footer.png';

const Footer = () => (
    <footer className="hidden-print">
        <Grid>
            <Row>
                <Col sm={6}>
                    <div className="texts">Seed backoffice</div>
                    <div className="version">Version {VERSION}</div>
                </Col>
                <Col sm={6} className="text-right">
                    <Image src={logo}/>
                </Col>
            </Row>
        </Grid>
    </footer>
);

export default Footer;
