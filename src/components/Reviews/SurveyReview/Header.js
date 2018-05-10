/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import {includes} from 'lodash';

import SurveyReassign from './SurveyReassign';

import {Role} from '../../common';
import {roles, surveyAddressStateEnum as surveyEnum, modalsEnum} from '../../../constants';

const Header = ({
    surveyAddress, onOpenModal, onChange, pollster
}) => (
    <Row className="form-group hidden-print">
        <Col sm={3}>
            <Button
                componentClass={Link}
                to="/reviews"
            >
                <FontAwesome name="reply-all"/> Volver
            </Button>
        </Col>
        <Col sm={9}>
            <ButtonGroup className="pull-right">
                <Button onClick={() => window.print()}>
                    <FontAwesome name="print"/> Imprimir
                </Button>
                {surveyAddress.surveyAddressState >= surveyEnum.CLOSED &&
                <Role
                    roles={[
                        roles.NATIONAL_COORDINATOR,
                        roles.COORDINATOR,
                        roles.SUB_COORDINATOR,
                        roles.SUPERVISOR,
                        roles.RECUPERATOR
                    ]}
                >
                    <Button onClick={() => onOpenModal(modalsEnum.REOPEN_SURVEY)}>
                        <FontAwesome name="unlock"/> Reabrir
                    </Button>
                </Role>}
                {surveyAddress.surveyAddressState === surveyEnum.CLOSED && surveyAddress.valid &&
                <Role
                    roles={[
                        roles.NATIONAL_COORDINATOR,
                        roles.COORDINATOR,
                        roles.SUB_COORDINATOR
                    ]}
                >
                    <Button onClick={() => onOpenModal(modalsEnum.APPROVE_SURVEY)}>
                        <FontAwesome name="thumbs-o-up"/> Aprobar
                    </Button>
                </Role>}
                {includes([surveyEnum.OPEN, surveyEnum.IN_PROGRESS], surveyAddress.surveyAddressState) &&
                <Role
                    roles={[
                        roles.NATIONAL_COORDINATOR,
                        roles.COORDINATOR,
                        roles.SUB_COORDINATOR,
                        roles.SUPERVISOR,
                        roles.RECUPERATOR
                    ]}
                >
                    <SurveyReassign
                        surveyAddress={surveyAddress}
                        pollster={pollster}
                        onChange={e => onChange(e)}
                        onSubmit={() => onOpenModal(modalsEnum.REASSIGN_SURVEY)}
                    />
                </Role>}
            </ButtonGroup>
        </Col>
    </Row>
);

Header.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    surveyAddress: PropTypes.shape({
        surveyAddressState: PropTypes.number.isRequired,
        pollsterName: PropTypes.string.isRequired,
        pollster: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
    pollster: PropTypes.shape({})
};

Header.defaultProps = {
    pollster: null
};

export default Header;
