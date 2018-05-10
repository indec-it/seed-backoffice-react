import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelGroup} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {isEmpty, map} from 'lodash';

import Response from './Response';
import Characteristics from './Characteristics';
import ParseQuestions from '../ParseQuestions';
import * as MemberChapters from '../../../../../data/member';
import {randomString} from '../../../../../services/utils';

const chaptersOrders = [
    'labourSituation',
    'overallHealth',
    'physicalActivity',
    'smoking',
    'hypertension',
    'bodyWeight',
    'diet',
    'cholesterol',
    'alcohol',
    'diabetes',
    'injuries',
    'preventativeMedicine',
    'colonRectalCancerPrevention',
    'pregnancy',
    'anthropometricMeasurements',
    'chemicalMeasurements'
];

const Member = ({idHome, members}) => (
    <Fragment>
        <h4 className="members-title">Lista de personas del Hogar: </h4>
        <PanelGroup accordion id={`members${idHome}`}>
            {!isEmpty(members) && members.map(member => {
                if (!member.disabled) {
                    const response = {
                        response: member.response,
                        noResponseReason: member.noResponseReason,
                        noResponseReasonSpecification: member.noResponseReasonSpecification,
                        noResponseCause: member.noResponseCause,
                        interruptionReason: member.interruptionReason,
                        interruptionSpecification: member.interruptionSpecification
                    };

                    return (
                        <Panel key={randomString()} eventKey={`${idHome}${member.order}`}>
                            {member.characteristics &&
                            <Fragment>
                                <Panel.Heading className="list-heading">
                                    <Panel.Title toggle>
                                        {member.order})&nbsp;
                                        <FontAwesome
                                            name={member.valid ? 'check-circle-o' : 'close'}
                                            className={member.valid ? 'text-success' : 'text-danger'}
                                        />
                                        &nbsp;<FontAwesome name="chevron-circle-right"/>
                                        <strong> Nombre:</strong> {member.characteristics.name}
                                        {member.order === 1 && <strong> Jefe de Hogar</strong>}&nbsp;&nbsp;&nbsp;
                                        {member.selectedMember && <FontAwesome name="universal-access" size="2x"/>}
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <Response
                                        chapter={response}
                                        order={`${idHome}${member.order}`}
                                    />
                                    <Characteristics
                                        characteristic={member.characteristics}
                                        homeBoss={member.order === 1}
                                        order={`${idHome}${member.order}`}
                                    />
                                    {member.selectedMember && map(chaptersOrders, chapters => member[chapters] && (
                                        <ParseQuestions
                                            key={randomString()}
                                            chapter={member[chapters]}
                                            questions={MemberChapters[chapters]}
                                            order={`${idHome}${member.order}`}
                                        />))}
                                    <hr/>
                                </Panel.Body>
                            </Fragment>
                            }
                            {!member.characteristics && <h4>No Hay Datos para mostrar</h4>}
                        </Panel>
                    );
                }
                return null;
            })}
            {isEmpty(members) && <h4>No Hay Datos para mostrar</h4>}
        </PanelGroup>
    </Fragment>
);

Member.propTypes = {
    idHome: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired
};

export default Member;
