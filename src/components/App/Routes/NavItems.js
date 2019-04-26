import React from 'react';
import PropTypes from 'prop-types';
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faTasks
} from '@fortawesome/free-solid-svg-icons';

const NavItems = ({role, redirect}) => {
    if (role === 'admin') {
        return (
            <Nav className="mr-auto" navbar>        
                <NavItem>
                    <NavLink onClick={
                        () => redirect('/example')}
                    >
                        <FontAwesomeIcon icon={faTasks}/>
                        &nbsp; Sample List
                    </NavLink>
                </NavItem>
            </Nav>
        );
    }

    return null;
};

NavItems.propTypes = {
    redirect: PropTypes.func.isRequired,
    role: PropTypes.string
};

NavItems.defaultProps = {
    role: null
};

export default NavItems;
