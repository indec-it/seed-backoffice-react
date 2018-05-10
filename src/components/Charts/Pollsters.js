import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import {isEmpty} from 'lodash';

import {pollstersChart} from './utils';
import {fetchPollsters} from '../../actions/pollsters';
import {fetchStates} from '../../actions/review';
import {LoadingButton} from '../common';
import {DropDown} from '../common/fields';

class Pollsters extends Component {
    static propTypes = {
        fetchStates: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({})
        }),
        fetchPollsters: PropTypes.func.isRequired,
        states: PropTypes.arrayOf(PropTypes.shape()),
        pollsterList: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({})
            )
        )
    };

    static defaultProps = {
        states: null,
        pollsterList: null,
        match: null
    };

    constructor(props) {
        super(props);
        this.state = {
            stateId: ''
        };
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        if (params && params.state) {
            this.onChange({stateId: params.state});
        }
        this.props.fetchStates();
    }

    onChange(object) {
        this.setState(object);
        if (!isEmpty(object.stateId)) {
            this.props.fetchPollsters(object);
        }
    }

    render() {
        const {states, loading, pollsterList} = this.props;
        const {stateId} = this.state;
        let i = 0;
        const getPosition = () => { i += 1; return i; };
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <h2>Monitoreo por Encuestadores</h2>
                    </Col>
                </Row>
                <Col sm={12}>
                    <hr className="hr-title"/>
                </Col>
                <Row>
                    <Col sm={4}>
                        <ButtonGroup>
                            <Button componentClass={Link} to="/charts">
                                Monitoreo General
                            </Button>
                            <Button componentClass={Link} to="/charts/response">
                                Monitoreo de Respuestas
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col sm={2} className="push-down">
                        Filtro por Jurisdicción
                    </Col>
                    <Col sm={4}>
                        {states &&
                        <DropDown
                            value={stateId}
                            onChange={e => this.onChange({stateId: e.target.value})}
                        >
                            <option value="">[Seleccione]</option>
                            {states.map(state => <option value={state._id} key={state._id}>{state.name}</option>)}
                        </DropDown>}
                    </Col>
                    <Col sm={2}/>
                </Row>
                <Col sm={12}>
                    <hr/>
                </Col>
                <Row>
                    <Col sm={12}>
                        {loading && <LoadingButton label="Cargando..."/>}
                        {!loading && pollsterList && pollsterList.map(rows => (
                            <Row>
                                {rows.map(pollster => (
                                    <Col sm={4} key={pollster._id.id}>
                                        <Button
                                            componentClass={Link}
                                            to={`/charts/pollsters/${pollster._id.id}/${stateId}`}
                                        >
                                            {getPosition()}) {pollster._id.pollsterName} {pollster._id.rol}
                                        </Button>
                                        <Bar
                                            data={pollstersChart(pollster)}
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
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        loading: state.pollsters.loading,
        pollsterList: state.pollsters.pollsterList,
        states: state.review.states
    }),
    dispatch => ({
        fetchPollsters: stateId => dispatch(fetchPollsters(stateId)),
        fetchStates: () => dispatch(fetchStates())
    })
)(Pollsters);
