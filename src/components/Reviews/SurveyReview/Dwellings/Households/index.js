import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelGroup} from 'react-bootstrap';
import {toString, find} from 'lodash';
import FontAwesome from 'react-fontawesome';

import DwellingCharacteristics from './DwellingCharacteristics';
import Characteristics from './Characteristics';
import Comments from './Comments';
import Income from './Income';
import HeadLabourSituation from './HeadLabourSituation';
import Detection from './Detection';
import Member from '../Member';
import Visits from '../Visits';

import HouseholdResponse from '../../../../../data/household/response';

const getState = (response, noResponseReason, cause) => {
    if (response === 1) {
        return 'SI';
    } else if (response === 2) {
        const {label} = find(HouseholdResponse.rows[1].questions[0].options, opt => opt.value === noResponseReason);
        const {rows} = HouseholdResponse;
        const causeText = {};
        rows.map(row => row.questions.map(question =>
            question.parents && question.parents.map(parents => (
                parents.value === noResponseReason &&
                Object.assign(causeText, find(question.options, option => option.value === cause))
            ))
        ));
        return <Fragment>NO. <strong>Motivo:</strong> {label} ({causeText.label})</Fragment>;
    }
    return null;
};

const Households = ({households, dwellingOrder}) => (
    <Fragment>
        <PanelGroup accordion id={`householdDwelling${dwellingOrder}`} defaultActiveKey={`${dwellingOrder}h1`}>
            {households.map(household => {
                if (household && !household.disabled) {
                    return (
                        <Panel
                            key={`${dwellingOrder}h${toString(household.order)}`}
                            eventKey={`${dwellingOrder}h${toString(household.order)}`}
                            className="list-panel"
                        >
                            <Panel.Heading className="list-heading">
                                <Panel.Title toggle>
                                    {household.valid && <FontAwesome name="check-circle-o" className="text-success"/>}
                                    {!household.valid && <FontAwesome name="close" className="text-danger"/>}
                                    <strong>
                                        &nbsp;<FontAwesome name="chevron-circle-right"/> Hogar Nro:
                                    </strong>&nbsp;{household.order}&nbsp;
                                    <strong>¿El hogar es respondente?</strong>
                                    &nbsp;{getState(
                                        household.response,
                                        household.noResponseReason,
                                        household.noResponseCauseAbsence ||
                                        household.noResponseCauseRejection ||
                                        household.noResponseCauseOtherCauses
                                    )}
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <DwellingCharacteristics
                                    chapter={household.dwellingCharacteristics}
                                    order={`${dwellingOrder}${household.order}`}
                                />
                                <Detection
                                    chapter={household.detection}
                                    order={`${dwellingOrder}${household.order}`}
                                />
                                <Characteristics
                                    chapter={household.characteristics}
                                    order={`${dwellingOrder}${household.order}`}
                                />
                                <Income
                                    chapter={household.income}
                                    order={`${dwellingOrder}${household.order}`}
                                />
                                <HeadLabourSituation
                                    chapter={household.labourSituation}
                                    order={`${dwellingOrder}${household.order}`}
                                />
                                <Comments
                                    chapter={household.comments}
                                    order={`${dwellingOrder}${household.order}`}
                                />
                                <Member idHome={`${dwellingOrder}${household.order}`} members={household.members}/>
                                <Visits
                                    order={`${dwellingOrder}${household.order}`}
                                    visits={household.visits}
                                    label=" al hogar"
                                />
                            </Panel.Body>
                        </Panel>
                    );
                }
                return null;
            })}
        </PanelGroup>
    </Fragment>
);

Households.propTypes = {
    households: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    dwellingOrder: PropTypes.number.isRequired
};

export default Households;
