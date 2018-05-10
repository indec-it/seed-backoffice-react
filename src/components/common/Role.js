import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {includes, some} from 'lodash';

const includeRole = (roles, sessionRoles) => some(roles, role => includes(sessionRoles, role));

const Role = ({
    roles, children, sessionRoles
}) => {
    if (includeRole(roles, sessionRoles)) {
        return children;
    }
    return null;
};

Role.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    canRender: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.instanceOf(Component),
        PropTypes.func,
        PropTypes.shape(),
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.instanceOf(Component),
            PropTypes.func
        ]))
    ]),
    rolesReadOnly: PropTypes.arrayOf(PropTypes.string)
};

Role.defaultProps = {
    canRender: false,
    sessionRoles: null,
    children: undefined
};

export default connect(
    state => ({sessionRoles: state.session.profile.roles})
)(Role);
