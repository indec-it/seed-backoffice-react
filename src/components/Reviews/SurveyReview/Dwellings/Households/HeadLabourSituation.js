import React from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {headLabourSituation} from '../../../../../data/household';

const HeadLabourSituation = ({chapter, order}) => (
    <ParseQuestions
        key={`headLabourSituation${order}`}
        chapter={chapter}
        questions={headLabourSituation}
        forceDraw
    />
);

HeadLabourSituation.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.string.isRequired
};

export default HeadLabourSituation;
