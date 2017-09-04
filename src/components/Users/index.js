import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import UsersList from './UsersList';
import UsersEditor from './UsersEditor';

const Users = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/new`} key="new" component={UsersEditor}/>
        <Route path={`${path}/:id`} key="edit" component={UsersEditor}/>
        <Route path={path} component={UsersList}/>
    </Switch>
);

Users.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Users;
