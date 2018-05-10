/* global VERSION */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import logo from '../../images/logo-footer.png';
import {getRoleName} from '../common/roleComponent';
import {User} from '../../model';

const Footer = ({profile}) => (
    <footer className="hidden-print">
        <Grid>
            <Row>
                <Col sm={2}>
                    <div className="text-small">
                        <small>INDEC - Back office</small>
                    </div>
                    <div className="version">Version {VERSION}</div>
                </Col>
                {profile &&
                <Col sm={2}>
                    <div className="texts"><FontAwesome name="id-card"/> {profile.surname}, {profile.name}</div>
                    <div className="version">{getRoleName(profile)}</div>
                </Col>}
                <Col sm={4} className="text-center">
                    Mesa de ayuda
                    <br/>
                    Teléfonos únicamente de Lunes a Viernes 5031-4630&nbsp;
                    <a href="https://jira.indec.gob.ar/servicedesk/customer/portal/21/create/210">Portal MDA</a>
                </Col>
                <Col sm={4} className="text-right">
                    <Image src={logo}/>
                </Col>
            </Row>
        </Grid>
    </footer>
);

Footer.propTypes = {
    profile: PropTypes.instanceOf(User)
};

Footer.defaultProps = {
    profile: null
};

export default connect(state => state.session)(Footer);
