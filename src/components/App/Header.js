import React from 'react';
import {Col, Image, Row} from 'react-bootstrap';

const brand = require('../../images/brand.png');

const Header = () => (
    <header className="hidden-print">
        <div className="container-fluid no-padding">
            <Row className="top-line-color">
                <Col sm={12}/>
            </Row>
        </div>
        <Row>
            <Col sm={12}>
                <Image src={brand} className="logo"/>
            </Col>
        </Row>
    </header>
);

export default Header;
