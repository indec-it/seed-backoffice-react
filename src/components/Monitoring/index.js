import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import MonitoringList from './MonitoringList';
import MonitoringResponse from './MonitoringResponse';

const Monitoring = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/response/:stateId/:ups`} component={MonitoringResponse} exact/>
        <Route path={`${path}/response/:stateId`} component={MonitoringResponse} exact/>
        <Route path={`${path}/response`} component={MonitoringResponse} exact/>
        <Route path={path} component={MonitoringList} exact/>
    </Switch>
);

Monitoring.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Monitoring;
