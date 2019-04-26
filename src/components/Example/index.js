import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import List from './List';

const Index = ({match: {path}}) => (
    <Switch>
        <Route path={path} component={List} key="list" exact/>
    </Switch>
);

Index.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Index;
