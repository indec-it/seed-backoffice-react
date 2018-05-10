import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid, Col, Row, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {sumBy} from 'lodash';

import {fetchGeneralMonitoring} from '../../../actions/monitoring';
import LoadingButton from '../../common/LoadingButton';

class MonitoringList extends Component {
    static propTypes = {
        generalMonitoring: PropTypes.arrayOf(PropTypes.shape),
        loading: PropTypes.bool.isRequired,
        fetchGeneralMonitoring: PropTypes.func.isRequired
    };

    static defaultProps = {
        generalMonitoring: null
    };

    componentWillMount() {
        this.props.fetchGeneralMonitoring();
    }

    render() {
        const {generalMonitoring, loading} = this.props;
        return (
            <Grid>
                <Row className="monitoring">
                    <Col sm={8}>
                        <h2>
                            <FontAwesome name="dashboard"/> Monitoreo de Avance
                        </h2>
                    </Col>
                    <Col sm={4}>
                        <h2>
                            <Button to="/monitoring/response" componentClass={Link}>
                                <FontAwesome name="clone"/> Ver Respuestas
                            </Button>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="text-center">
                        {loading && <LoadingButton label="Cargando..."/>}
                    </Col>
                </Row>
                {!loading && generalMonitoring &&
                <Fragment>
                    <Row className="bordered">
                        <Col sm={3} className="text-center">
                            <h4>
                                <Button bsSize="sm" onClick={() => this.props.fetchGeneralMonitoring()}>
                                    <FontAwesome name="refresh"/>
                                </Button>
                                Jurisdicción
                            </h4>
                        </Col>
                        <Col sm={2} className="no-padding text-center">
                            <h4>Total de Viviendas</h4>
                        </Col>
                        <Col sm={1} className="no-padding text-center">
                            <h4>Sin Asignar</h4>
                        </Col>
                        <Col sm={1} className="no-padding text-center">
                            <h4>Asignadas</h4>
                        </Col>
                        <Col sm={1} className="no-padding text-center">
                            <h4>En Campo</h4>
                        </Col>
                        <Col sm={1} className="no-padding text-center">
                            <h4>Cerradas</h4>
                        </Col>
                        <Col sm={2} className="no-padding text-center">
                            <h4>Aprobadas</h4>
                        </Col>
                    </Row>
                    {generalMonitoring.map(monitoring => (
                        <Row className="bordered" key={monitoring._id.stateName}>
                            <Col sm={3}>{monitoring._id.stateName}</Col>
                            <Col sm={2} className="text-center">{monitoring.total}</Col>
                            <Col sm={1} className="text-center">{monitoring.unassigned}</Col>
                            <Col sm={1} className="text-center">{monitoring.assigned}</Col>
                            <Col sm={1} className="text-center">{monitoring.inProgress}</Col>
                            <Col sm={1} className="text-center">{monitoring.resolved}</Col>
                            <Col sm={2} className="text-center">{monitoring.closed}</Col>
                        </Row>))}
                    <Row className="bordered">
                        <Col sm={3}><b>Totales</b></Col>
                        <Col sm={2} className="text-center">
                            <b>{sumBy(generalMonitoring, monitoring => monitoring.total)}</b>
                        </Col>
                        <Col sm={1} className="text-center">
                            <b>{sumBy(generalMonitoring, monitoring => monitoring.unassigned)}</b>
                        </Col>
                        <Col sm={1} className="text-center">
                            <b>{sumBy(generalMonitoring, monitoring => monitoring.assigned)}</b>
                        </Col>
                        <Col sm={1} className="text-center">
                            <b>{sumBy(generalMonitoring, monitoring => monitoring.inProgress)}</b>
                        </Col>
                        <Col sm={1} className="text-center">
                            <b>{sumBy(generalMonitoring, monitoring => monitoring.resolved)}</b>
                        </Col>
                        <Col sm={2} className="text-center">
                            <b>{sumBy(generalMonitoring, monitoring => monitoring.closed)}</b>
                        </Col>
                    </Row>
                </Fragment>}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        generalMonitoring: state.monitoring.generalMonitoring,
        loading: state.monitoring.loading
    }),
    dispatch => ({
        fetchGeneralMonitoring: () => dispatch(fetchGeneralMonitoring())
    })
)(MonitoringList);
