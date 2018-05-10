import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {isEmpty} from 'lodash';
import {PanelGroup, Panel, Row} from 'react-bootstrap';
import FormBuilder from '@indec/react-form-builder';

import {canAnswerQuestion} from '../../../../util';
import {randomString} from '../../../../services/utils';

const ParseQuestions = ({
    chapter, questions, order, forceDraw
}) => (
    <PanelGroup accordion id={`${questions.title}${order}`}>
        <Panel
            eventKey={`${questions.title}${order}}`}
            key={`${questions.title}${order}`}
            className="list-panel"
        >
            <Panel.Heading className="list-heading">
                <Panel.Title toggle>
                    <strong><FontAwesome name="chevron-circle-right"/> {questions.title}</strong>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                {!isEmpty(chapter) && questions.rows.map(row => (
                    <Row key={randomString()}>
                        {row.questions.map(question => (forceDraw || canAnswerQuestion(question, chapter)) && (
                            <FormBuilder
                                questionAnswer={chapter[question.name]}
                                question={question}
                                chapter={chapter}
                                disabled
                                plainAnswers
                                key={randomString()}
                            />)
                        )}
                    </Row>))}
                {isEmpty(chapter) && <h3>No hay datos para mostrar</h3>}
            </Panel.Body>
        </Panel>
    </PanelGroup>
);

ParseQuestions.propTypes = {
    chapter: PropTypes.shape({}),
    order: PropTypes.string,
    questions: PropTypes.shape({}).isRequired,
    forceDraw: PropTypes.bool
};

ParseQuestions.defaultProps = {
    chapter: null,
    forceDraw: false,
    order: '#'
};

export default ParseQuestions;
