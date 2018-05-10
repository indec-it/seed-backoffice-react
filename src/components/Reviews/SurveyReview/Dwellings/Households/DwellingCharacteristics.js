import React from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {dwellingCharacteristics} from '../../../../../data/household';

const DwellingCharacteristics = ({chapter, order}) => (
    <ParseQuestions
        key={`dwellingCharacteristics${order}`}
        chapter={chapter}
        questions={dwellingCharacteristics}
    />
);

DwellingCharacteristics.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.string.isRequired
};

export default DwellingCharacteristics;
