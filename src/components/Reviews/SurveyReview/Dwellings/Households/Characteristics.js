import React from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {characteristics} from '../../../../../data/household';

const Characteristics = ({chapter, order}) => (
    <ParseQuestions
        key={`householdCharacteristics${order}`}
        chapter={chapter}
        questions={characteristics}
    />
);

Characteristics.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Characteristics;
