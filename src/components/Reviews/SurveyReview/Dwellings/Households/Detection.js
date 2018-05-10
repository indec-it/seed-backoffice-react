import React from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {detection} from '../../../../../data/household';

const Dwelling = ({
    chapter, order
}) => (
    <ParseQuestions
        key={`detection${order}`}
        chapter={chapter}
        questions={detection}
        forceDraw
    />
);

Dwelling.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.string.isRequired
};

export default Dwelling;
