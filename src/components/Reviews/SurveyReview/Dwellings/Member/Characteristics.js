import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {characteristics, homeBossCharacteristics} from '../../../../../data/member';

const Characteristics = ({characteristic, homeBoss, order}) => (
    <Fragment>
        {homeBoss && <ParseQuestions
            key={`characteristic${order}`}
            chapter={characteristic}
            questions={homeBossCharacteristics}
        />}
        {!homeBoss && <ParseQuestions
            key={`characteristic${order}`}
            chapter={characteristic}
            questions={characteristics}
        />}
    </Fragment>
);

Characteristics.propTypes = {
    characteristic: PropTypes.shape({}).isRequired,
    homeBoss: PropTypes.bool.isRequired,
    order: PropTypes.string.isRequired
};

export default Characteristics;
