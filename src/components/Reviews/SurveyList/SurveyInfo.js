import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {map} from 'lodash';
import {Button, Popover, OverlayTrigger, Row, Col} from 'react-bootstrap';

const renderPopopver = surveyAddress => (
    <Popover id="surveyInfoPopover" className="text-center popover-info no-padding">
        <Row className="no-padding">
            <Col sm={4} className="no-padding text-center popover-header">
                <b>Vivienda</b>
            </Col>
            <Col sm={8} className="no-padding">
                <Row className="no-padding">
                    <Col sm={7} className="no-padding text-center popover-header">
                        <b>Hogar</b>
                    </Col>
                    <Col sm={5} className="no-padding text-center popover-header">
                        <b>Miembro</b>
                    </Col>
                </Row>
            </Col>
        </Row>
        {map(surveyAddress, survey => (
            <Row key={survey.id} className="no-padding">
                <Col sm={4} className="no-padding text-center">
                     N°: <b>{survey.id}</b> Cantidad de Hogares: <b>{survey.householdQuantity}</b>
                </Col>
                <Col sm={8} className="no-padding text-center">
                    {map(survey.households, household => (
                        <Row key={`household${household.id}`} className="no-padding">
                            <Col sm={7} className="no-padding text-center popover-border-left">
                                Respondente: <b>{household.response === 1 ? 'Si' : 'No'}</b>&nbsp;
                                Cantidad de Personas: <b>{household.memberQuantity}</b>
                            </Col>
                            <Col sm={5} className="no-padding text-center popover-border-left">
                                {map(household.members, member => (
                                    <Row>
                                        <Col sm={12} className="no-padding">
                                            N°: <b>{member.id}</b>
                                            &nbsp;Respondente: <b>{member.response === 1 ? 'Si' : 'No'}</b>
                                        </Col>
                                    </Row>)
                                )}
                            </Col>
                        </Row>)
                    )}
                </Col>
            </Row>)
        )}
    </Popover>
);

const SurveyInfo = ({
    surveyAddress, rejected
}) => (
    <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="bottom"
        rootClose
        overlay={
            renderPopopver(surveyAddress)
        }
    >
        <Button>
            <FontAwesome
                name="flag"
                className={classNames('', {
                    'text-danger': rejected,
                    'text-white': !rejected
                })}
            />
        </Button>
    </OverlayTrigger>
);

SurveyInfo.propTypes = {
    surveyAddress: PropTypes.shape({}).isRequired,
    rejected: PropTypes.bool.isRequired
};

export default SurveyInfo;
