import React from 'react';
import PropTypes from 'prop-types';
import {Panel, Col, Row} from 'react-bootstrap';
import {find} from 'lodash';

import {surveyStateTranslate} from '../../../../constants';

const getState = surveyAddressState =>
    find(surveyStateTranslate, state => state._id === surveyAddressState).description;

const Geographic = ({geographic}) => (
    <Panel className="margin-top-panel">
        <Panel.Heading>Ubicación Geográfica</Panel.Heading>
        <Panel.Body>
            <Col sm={11} className="no-padding">
                <Row>
                    <Col sm={3} className="no-padding">
                        <strong>Jurisdicción:</strong> {geographic.stateName}
                    </Col>
                    <Col sm={1} className="no-padding">
                        <strong>UPS:</strong> {geographic.ups}
                    </Col>
                    <Col sm={1} className="no-padding">
                        <strong>Área:</strong> {geographic.area}
                    </Col>
                    <Col sm={1} className="no-padding">
                        <strong>Fracción:</strong> {geographic.fraction}
                    </Col>
                    <Col sm={1} className="no-padding">
                        <strong>Radio:</strong> {geographic.radio}
                    </Col>
                    <Col sm={1} className="no-padding">
                        <strong>Manzana:</strong> {geographic.block}
                    </Col>
                    <Col sm={2} className="no-padding">
                        <strong>L. Manzana:</strong> {geographic.side}
                    </Col>
                </Row>
                <Row className="vertical-margin">
                    <Col sm={6} className="no-padding">
                        <strong>Dirección:</strong> {geographic.street}
                    </Col>
                    <Col sm={2}className="no-padding">
                        <strong>Número:</strong> {geographic.streetNumber}
                    </Col>
                    <Col sm={3}className="no-padding">
                        <strong>Piso:</strong> {geographic.floor || 'S/D'}
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} className="no-padding">
                        <strong>Última modificación: </strong>
                        {new Date(geographic.updatedAt).toLocaleString('es-AR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Col>
                    <Col sm={2} className="no-padding">
                        <strong>Estado:</strong> {getState(geographic.surveyAddressState)}
                    </Col>
                    <Col sm={3}className="no-padding">
                        <strong>Jefe de Equipo:</strong> {geographic.supervisorName}
                    </Col>
                    <Col sm={3}className="no-padding">
                        <strong>Asignada a:</strong> {geographic.pollsterName}
                    </Col>
                </Row>
            </Col>
            <Col sm={1} className="no-padding dwelling-number">
                <h4 className="text-center">
                    <strong>Nro. Listado</strong>
                    <br/>{geographic.listNumber}
                </h4>
            </Col>
        </Panel.Body>
    </Panel>
);

Geographic.propTypes = {
    geographic: PropTypes.shape().isRequired
};

export default Geographic;
