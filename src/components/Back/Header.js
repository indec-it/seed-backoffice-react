import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Header = () => (
    <header className="hidden-print">
        <Navbar inverse>
            <Navbar.Collapse className="no-padding">
                <Nav>
                    <NavItem>
                        <Link to="/users">
                            <FontAwesome name="users"/> Usuarios
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logs">
                            <FontAwesome name="stack-overflow"/> Logs
                        </Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem href="signOut">
                        <div className="hrm-link">
                            <FontAwesome name="power-off"/> Cerrar sesión
                        </div>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Header;
