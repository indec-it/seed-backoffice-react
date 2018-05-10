import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';

import {pollsterStackedBar} from './utils';
import {fetchPollster} from '../../actions/pollsters';
import {LoadingButton} from '../common';

class Pollster extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({})
        }),
        fetchPollster: PropTypes.func.isRequired,
        pollster: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({})
            )
        )
    };

    static defaultProps = {
        pollster: null,
        match: null
    };

    componentDidMount() {
        const {match: {params}} = this.props;
        this.props.fetchPollster(params.id);
    }

    render() {
        const {loading, pollster} = this.props;
        const {match: {params}} = this.props;
        return (
            <Grid fluid>
                {pollster &&
                <Fragment>
                    <Row>
                        <Col sm={12}>
                            <h3>Monitoreo de trabajo de {pollster.name}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <hr className="hr-title"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="text-center">
                            <ButtonGroup>
                                <Button componentClass={Link} to="/charts">
                                    Monitoreo General
                                </Button>
                                <Button componentClass={Link} to="/charts/response">
                                    Monitoreo de Respuestas
                                </Button>
                                <Button componentClass={Link} to={`/charts/pollsters/${params.state}`}>
                                    Monitoreo de Encuestadores
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <hr/>
                        </Col>
                    </Row>
                    <Row>
                        <Col smOffset={3} sm={6}>
                            {loading && <LoadingButton label="Cargando..."/>}
                            {!loading && pollster.dates &&
                                <Bar
                                    data={{
                                        datasets: pollsterStackedBar(pollster.dates),
                                        labels: [
                                            'Total',
                                            'Asignadas',
                                            'En Campo',
                                            'Cerradas',
                                            'Aprobadas'
                                        ]
                                    }}
                                    options={
                                        {
                                            scales: {
                                                yAxes: [{
                                                    stacked: true
                                                }],
                                                xAxes: [{
                                                    stacked: true
                                                }]
                                            }
                                        }
                                    }
                                />
                            }
                        </Col>
                    </Row>
                </Fragment>}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        loading: state.pollsters.loading,
        pollster: state.pollsters.pollster
    }),
    dispatch => ({
        fetchPollster: id => dispatch(fetchPollster(id))
    })
)(Pollster);
