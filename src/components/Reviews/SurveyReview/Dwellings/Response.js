import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {PanelGroup, Panel} from 'react-bootstrap';

import DwellingUtils from './utils';

import {response} from '../../../../data/dwelling';

const Response = ({
    dwellingResponse, dwellingOrder
}) => (
    <PanelGroup accordion id="dwellingSituation">
        <Panel
            eventKey={`dwellingSituation${dwellingOrder}`}
            key={`dwellingSituation${dwellingOrder}`}
        >
            <Panel.Heading>
                <Panel.Title toggle>
                    <strong>
                        Situación de la Vivienda
                    </strong>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                {response.rows.map(row => (
                    <Fragment key={dwellingOrder + row.id}>
                        {row.questions.map(question => (
                            <div key={question.name}>
                                {DwellingUtils.canDrawQuestion(question, dwellingResponse) && (
                                    <p>
                                        {question.text}: {DwellingUtils.parseQuestion(question, dwellingResponse)}
                                    </p>
                                )}
                            </div>
                        ))}
                    </Fragment>
                ))}
            </Panel.Body>
        </Panel>
    </PanelGroup>
);

Response.propTypes = {
    dwellingResponse: PropTypes.shape({}).isRequired,
    dwellingOrder: PropTypes.number.isRequired
};

export default Response;
