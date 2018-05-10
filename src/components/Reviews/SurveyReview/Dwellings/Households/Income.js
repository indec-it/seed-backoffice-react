import React from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {income} from '../../../../../data/household';

const Incomes = ({chapter, order}) => (
    <ParseQuestions
        key={`income${order}`}
        chapter={chapter}
        questions={income}
        forceDraw
    />
);

Incomes.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.string.isRequired
};

export default Incomes;
