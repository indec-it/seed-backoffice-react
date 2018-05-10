import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import {chunk} from 'lodash';

import {generalChart} from './utils';
import {fetchGeneralMonitoring} from '../../actions/monitoring';
import {Role, LoadingButton} from '../common';
import {roles} from '../../constants';

class GeneralMonitoring extends Component {
    static propTypes = {
        generalMonitoring: PropTypes.arrayOf(PropTypes.shape),
        loading: PropTypes.bool.isRequired,
        fetchGeneralMonitoring: PropTypes.func.isRequired
    };

    static defaultProps = {
        generalMonitoring: null
    };

    componentDidMount() {
        this.props.fetchGeneralMonitoring();
    }

    render() {
        const {generalMonitoring, loading} = this.props;
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <h2> Monitoreo General</h2>
                    </Col>
                </Row>
                <Col sm={12}>
                    <hr className="hr-title"/>
                </Col>
                <Row>
                    <Col sm={12}>
                        <ButtonGroup>
                            <Button componentClass={Link} to="/charts/response">
                                Monitoreo de Respuestas
                            </Button>
                            <Button componentClass={Link} to="/charts/pollsters">
                                Monitoreo de Encuestadores
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Col sm={12}>
                    <hr/>
                </Col>
                <Row>
                    <Col sm={8}>
                        {loading && <LoadingButton label="Cargando..."/>}
                        {!loading &&
                        <Fragment>
                            <Role
                                roles={[
                                    roles.NATIONAL_COORDINATOR,
                                    roles.NATIONAL_COORDINATOR_RO
                                ]}
                            >
                                {generalMonitoring && chunk(generalMonitoring, 3).map(rows => (
                                    <Row>
                                        {rows.map(general => (
                                            <Col sm={4} key={general._id.stateName}>
                                                <Bar
                                                    data={generalChart(general)}
                                                    width={20}
                                                    height={10}
                                                    options={{
                                                        maintainAspectRatio: true,
                                                        barThickness: 1
                                                    }}
                                                />
                                            </Col>)
                                        )}
                                    </Row>)
                                )}
                            </Role>
                            <Role
                                roles={[
                                    roles.COORDINATOR,
                                    roles.SUB_COORDINATOR,
                                    roles.SUPERVISOR
                                ]}
                            >
                                {generalMonitoring && (
                                    <Row>
                                        <Col sm={8}>
                                            <Bar
                                                data={generalChart(generalMonitoring[0])}
                                                width={20}
                                                height={10}
                                                options={{
                                                    maintainAspectRatio: true,
                                                    barThickness: 1
                                                }}
                                            />
                                        </Col>
                                    </Row>)
                                }
                            </Role>
                        </Fragment>}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        generalMonitoring: state.monitoring.generalMonitoring,
        loading: state.monitoring.loading,
        profile: state.session.profile
    }),
    dispatch => ({
        fetchGeneralMonitoring: () => dispatch(fetchGeneralMonitoring())
    })
)(GeneralMonitoring);
