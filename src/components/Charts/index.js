import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import GeneralMonitoring from './GeneralMonitoring';
import Response from './Response';
import Pollsters from './Pollsters';
import Pollster from './Pollster';

const Monitoring = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/response`} component={Response} exact/>
        <Route path={`${path}/pollsters/`} component={Pollsters} exact/>
        <Route path={`${path}/pollsters/:state`} component={Pollsters} exact/>
        <Route path={`${path}/pollsters/:id/:state`} component={Pollster} exact/>
        <Route path={path} component={GeneralMonitoring} exact/>
    </Switch>
);

Monitoring.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Monitoring;
