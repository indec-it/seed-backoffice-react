import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import FieldMaterialsList from './FieldMaterialsList/index';
import DwellingList from './DwellingList/index';

const FieldMaterials = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/dwelling/:stateId/:ups/:area`} component={DwellingList} exact/>
        <Route path={`${path}/:stateId/:ups`} component={FieldMaterialsList} exact/>
        <Route path={`${path}/:stateId`} component={FieldMaterialsList} exact/>
        <Route path={path} component={FieldMaterialsList} exact/>
    </Switch>
);


FieldMaterials.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default FieldMaterials;
