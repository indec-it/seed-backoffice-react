import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {response, interruption} from '../../../../../data/member';

const Response = ({chapter, order}) => (
    <Fragment>
        <ParseQuestions
            key={`response${order}`}
            chapter={chapter}
            questions={response}
        />
        <ParseQuestions
            key={`interruption${order}`}
            chapter={chapter}
            questions={interruption}
        />
    </Fragment>
);

Response.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.string.isRequired
};

export default Response;
