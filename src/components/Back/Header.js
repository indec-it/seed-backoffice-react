/* global localStorage, window */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Nav, Navbar, NavItem, Alert} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {includes, isEmpty} from 'lodash';
import {roles} from '../../constants';
import {User} from '../../model/index';

const logOut = () => {
    localStorage.clear();
    window.location = '/signIn.html';
};

const Header = ({profile, anErrorOccurred, history}) => {
    const redirect = to => {
        history.push(to);
    };
    if (profile && !profile._id) {
        logOut();
    }

    return (
        <header className="hidden-print">
            {profile && !isEmpty(profile._id) &&
            <Navbar inverse>
                <Navbar.Collapse className="no-padding">
                    <Nav>
                        <NavItem onClick={() => redirect('/')} className="border-right">
                            <strong>INDEC</strong>
                        </NavItem>
                        {!includes(profile.roles, roles.POLLSTER) && !includes(profile.roles, roles.RAE) &&
                        <Fragment>
                            <NavItem onClick={() => redirect('/users')}>
                                <FontAwesome name="users"/> Usuarios
                            </NavItem>
                            <NavItem onClick={() => redirect('/assign')}>
                                <FontAwesome name="arrows-alt"/> Asignaciones
                            </NavItem>
                            <NavItem onClick={() => redirect('/fieldMaterials')} >
                                <FontAwesome name="align-justify"/> Muestra
                            </NavItem>
                            <NavItem onClick={() => redirect('/monitoring')} >
                                <FontAwesome name="dashboard"/> Monitoreo
                            </NavItem>
                            <NavItem onClick={() => redirect('/reviews')} >
                                <FontAwesome name="object-group"/> Revisión
                            </NavItem>
                            <NavItem onClick={() => redirect('/charts')} >
                                <FontAwesome name="area-chart"/> Métricas
                            </NavItem>
                        </Fragment>}
                        {includes(profile.roles, roles.RAE) &&
                            <NavItem onClick={() => redirect('/scheduledVisits')} >
                                <FontAwesome name="address-book"/> Agenda de Visitas
                            </NavItem>
                        }
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={() => logOut()}>
                            <FontAwesome name="power-off"/> Cerrar sesión
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>}
            {anErrorOccurred && (
                <Alert bsStyle="danger" bsSize="large" className="text-center">
                    <FontAwesome name="exclamation-triangle"/>&nbsp;
                    Hubo un error con la comunicación hacia el servidor, intente nuevamente más tarde
                    &nbsp;<FontAwesome name="exclamation-triangle"/>
                </Alert>)
            }
        </header>
    );
};

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    profile: PropTypes.instanceOf(User),
    anErrorOccurred: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

Header.defaultProps = {
    history: null,
    profile: null,
    anErrorOccurred: null
};

export default withRouter(connect(
    state => ({
        profile: state.session.profile,
        anErrorOccurred: state.error.anErrorOccurred
    })
)(Header));
