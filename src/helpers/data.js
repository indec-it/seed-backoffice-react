import {find} from 'lodash';

const getQuestion = (chapter, options) => find(
    find(
        chapter.rows,
        row => row.id === options.rowId
    ).questions,
    question => question.name === options.name
);

export default {
    getQuestion
};
