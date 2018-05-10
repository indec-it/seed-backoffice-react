import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {PanelGroup, Panel, Grid, Row, Col, FormControl} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {isEmpty} from 'lodash';
import classNames from 'classnames';

import {randomString} from '../../../../services/utils';

const Visits = ({
    order, visits, label, dwellings
}) => (
    <PanelGroup accordion id={label}>
        <Panel
            eventKey={`${label}${order}`}
            key={randomString()}
            className="list-panel"
        >
            <Panel.Heading className="list-heading">
                <Panel.Title toggle>
                    <strong><FontAwesome name="chevron-circle-right"/> Visitas {label}</strong>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                {!isEmpty(visits) &&
                <Grid>
                    <Row>
                        {dwellings &&
                        <Fragment>
                            <Col sm={4}>Orden N°</Col>
                            <Col sm={4}>Fecha</Col>
                        </Fragment>}
                        {!dwellings &&
                        <Fragment>
                            <Col sm={1}>Orden N°</Col>
                            <Col sm={2}>Fecha Inicio</Col>
                            <Col sm={2}>Fecha Fin</Col>
                            <Col sm={2}>Proxima Visita</Col>
                            <Col sm={5}>Comentario</Col>
                        </Fragment>}
                    </Row>
                    {visits.map((visit, i) => (
                        <Row
                            key={randomString()}
                            className={classNames('', {
                                'bg-danger': visit.rejected, 'bg-success': !visit.rejected
                            })}
                            style={{borderBottom: 'solid 1px #000'}}
                        >
                            {dwellings &&
                                <Fragment>
                                    <Col sm={4}>{i + 1} </Col>
                                    <Col sm={4}>
                                        {new Date(visit.date).toLocaleString('es-AR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'long',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Col>
                                </Fragment>}
                            {!dwellings &&
                                <Fragment>
                                    <Col sm={1}>{i + 1}</Col>
                                    <Col sm={2}>
                                        {visit.start && new Date(visit.start).toLocaleString('es-AR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'long',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Col>
                                    <Col sm={2}>
                                        {!isEmpty(visit.end) && new Date(visit.end).toLocaleString('es-AR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'long',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Col>
                                    <Col sm={2}>
                                        {!isEmpty(visit.nextVisit) &&
                                            new Date(`${visit.nextVisit}`).toLocaleString('es-AR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                weekday: 'long',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }
                                    </Col>
                                    <Col sm={5}>
                                        <FormControl
                                            disabled
                                            componentClass="textarea"
                                            value={
                                                `${visit.comment || ''}${
                                                    visit.telephone ? ` Teléfono: ${visit.telephone}` : ''}`
                                            }
                                            rows={2}
                                            cols={30}
                                            style={{minHeight: '50px'}}
                                        />
                                    </Col>
                                </Fragment>}
                        </Row>
                    ))}
                </Grid>}
                {isEmpty(visits) && <h4 className="text-center">No Hay Visitas para mostrar</h4>}
            </Panel.Body>
        </Panel>
    </PanelGroup>
);

Visits.propTypes = {
    order: PropTypes.string,
    visits: PropTypes.arrayOf(PropTypes.shape({})),
    label: PropTypes.string.isRequired,
    dwellings: PropTypes.bool
};

Visits.defaultProps = {
    visits: undefined,
    order: '0',
    dwellings: false
};

export default Visits;
