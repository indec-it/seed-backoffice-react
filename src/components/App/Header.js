/* global localStorage, window */
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Navbar,
    Collapse,
    NavbarBrand,
    NavItem,
    NavLink,
    NavbarToggler,
    Nav,
    Alert
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPowerOff,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../model/index';
import NavItems from './Routes/NavItems';

const logOut = () => {
    localStorage.clear();
    window.location = '/';
};

const Header = ({profile, anErrorOccurred, history}) => {
    const redirect = to => history.push(to);

    if (profile && !profile.isValid()) {
        logOut();
    }

    return (
        <header className="hidden-print">
            <Navbar color="dark" dark expand="lg">
                <NavbarBrand onClick={() => redirect('/')}>
                    <strong className="logo-header">
                        SEED
                    </strong>
                </NavbarBrand>
                <NavbarToggler/>
                <Collapse isOpen navbar>
                    <NavItems role={profile.role} redirect={redirect}/>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => logOut()}>
                                <FontAwesomeIcon icon={faPowerOff}/>
                            &nbsp;&nbsp;Cerrar sesión
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {anErrorOccurred && (
                <Alert color="danger" bsSize="large" className="text-center">
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                        &nbsp;
                        Hubo un error con la comunicación hacia el servidor, intente nuevamente más tarde
                        &nbsp;
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                </Alert>
            )}
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
