import React from 'react';
import PropTypes from 'prop-types';

import ParseQuestions from '../ParseQuestions';
import {comments} from '../../../../../data/household';

const Comments = ({chapter, order}) => (
    <ParseQuestions
        key={`comments${order}`}
        chapter={chapter}
        questions={comments}
        forceDraw
    />
);

Comments.propTypes = {
    chapter: PropTypes.shape({}).isRequired,
    order: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Comments;
