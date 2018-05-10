import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import SurveyList from './SurveyList';
import SurveyReview from './SurveyReview';

const Reviews = ({match: {path}}) => (
    <Switch>
        <Route path={`${path}/:id/:stateId/response`} component={SurveyReview} exact/>
        <Route path={path} component={SurveyList} exact/>
    </Switch>
);

Reviews.propTypes = {
    match: PropTypes.shape({path: PropTypes.string}).isRequired
};

export default Reviews;
