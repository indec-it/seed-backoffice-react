import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {find, size} from 'lodash';
import FontAwesome from 'react-fontawesome';

import SurveyInfo from './SurveyInfo';
import {surveyStateTranslate} from '../../../constants';

const getState = survey => find(surveyStateTranslate,
    state => state._id === survey.surveyAddressState
).description;

const ListView = ({
    surveysAddressList, onClickFetchMore, surveysSize, reviewLoading
}) => (
    <Fragment>
        <Row>
            <Col md={12}>
                <Table responsive striped condensed bordered>
                    <thead>
                        <tr>
                            <th>UPS</th>
                            <th>Área</th>
                            <th>Domicilio</th>
                            <th>Nro. Viv.</th>
                            <th className="text-left">Jefe de Equipo</th>
                            <th className="text-left">Encuestador</th>
                            <th>Consistencia</th>
                            <th>Estado</th>
                            <th>Información</th>
                            <th>Operacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveysAddressList.map(surveyAddress => (
                            <tr key={surveyAddress._id} className="table-vertical-middle">
                                <td className="text-center">{surveyAddress.ups}</td>
                                <td className="text-center">{surveyAddress.area}</td>
                                <td>{surveyAddress.street} {surveyAddress.streetNumber}</td>
                                <td className="text-center">{surveyAddress.listNumber}</td>
                                <td>{surveyAddress.supervisorName}</td>
                                <td>{surveyAddress.pollsterName}</td>
                                <td className="text-center">
                                    {surveyAddress.valid === 1 && <FontAwesome name="check"/>}
                                    {surveyAddress.valid === 2 && <FontAwesome name="close" className="text-danger"/>}
                                </td>
                                <td className="text-center">
                                    {getState(surveyAddress)}
                                </td>
                                <td className="text-center">
                                    <SurveyInfo
                                        rejected={surveyAddress.rejected}
                                        surveyAddress={surveyAddress.info}
                                    />
                                </td>
                                <td className="text-center">
                                    <Button
                                        componentClass={Link}
                                        to={`/reviews/${surveyAddress._id}/${surveyAddress.stateId}/response`}
                                    >
                                        <FontAwesome name="mail-forward"/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <code>Viendo {size(surveysAddressList)} de {surveysSize}</code>
                            </td>
                            <td colSpan={8}>
                                {!reviewLoading && surveysSize > size(surveysAddressList) &&
                                    <Button
                                        onClick={() => onClickFetchMore()}
                                        bsStyle="primary"
                                        className="btn-block"
                                    >
                                        Cargar más encuestas
                                    </Button>
                                }
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Col>
        </Row>
    </Fragment>
);

ListView.propTypes = {
    surveysAddressList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onClickFetchMore: PropTypes.func.isRequired,
    surveysSize: PropTypes.number.isRequired,
    reviewLoading: PropTypes.bool.isRequired
};

export default ListView;
