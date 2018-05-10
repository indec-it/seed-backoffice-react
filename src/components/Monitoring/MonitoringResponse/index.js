import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button, Table, ButtonGroup} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {round, isNaN} from 'lodash';

import thead from './thead';
import {LoadingButton} from '../../common';
import {fetchResponseMonitoring} from '../../../actions/monitoring';

const urlTo = params => {
    if (params.area) {
        return `/reviews?stateId=${params.stateId}&ups=${params.ups}&area=${params.area}`;
    }
    if (params.ups) {
        return `/monitoring/response/${params.stateId}/${params.ups}`;
    }
    return `/monitoring/response/${params.stateId}`;
};

const divide = (dividend, divisor) => {
    const result = round((dividend / divisor) * 100, 1);
    if (isNaN(result)) {
        return '0.0';
    }
    return result.toFixed(1);
};

class MonitoringResponse extends Component {
    static propTypes = {
        fetchResponseMonitoring: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        responseMonitoring: PropTypes.arrayOf(PropTypes.shape()),
        match: PropTypes.shape({
            params: PropTypes.shape({}).isRequired
        }),
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        responseMonitoring: null,
        match: null
    };

    constructor(props) {
        super(props);
        this.state = {
            percent: false
        };
    }

    componentWillMount() {
        const {params} = (this.props.match && this.props.match) || {};
        this.props.fetchResponseMonitoring(params);
    }

    componentWillReceiveProps({match: {params}}) {
        if (params !== this.props.match.params) {
            this.props.fetchResponseMonitoring(params);
        }
    }

    render() {
        const {responseMonitoring, loading} = this.props;
        const {percent} = this.state;
        return (
            <Grid>
                <Row className="monitoring">
                    <Col sm={8}>
                        <h2>
                            <FontAwesome name="clone"/> Monitoreo de Respuestas
                        </h2>
                    </Col>
                    <Col smOffset={2} sm={2} className="text-right">
                        <h2>
                            <ButtonGroup>
                                <Button
                                    active={percent}
                                    onClick={() => this.setState({percent: !percent})}
                                >
                                    <FontAwesome name="percent"/> Porcentajes {percent && <FontAwesome name="check"/>}
                                </Button>
                                <Button
                                    onClick={() => this.props.history.goBack()}
                                >
                                    <FontAwesome name="history"/> Volver
                                </Button>
                            </ButtonGroup>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table responsive bordered condensed size="sm" className="monitoring">
                            {thead}
                            <tbody>
                                {loading && <tr><td colSpan={26}><LoadingButton label="Cargando..."/></td></tr>}
                                {!loading && responseMonitoring && responseMonitoring.map(response => (
                                    <tr key={response._id.stateName + response._id.ups + response._id.area}>
                                        <td colSpan={2}>
                                            <Button
                                                componentClass={Link}
                                                to={urlTo(response._id)}
                                            >
                                                {response._id.stateName}
                                                {response._id.ups && ` UPS: ${response._id.ups}`}
                                                {response._id.area && ` Area: ${response._id.area}`}
                                            </Button>
                                        </td>
                                        <td>
                                            {!percent && (response.onCourse || 0)}
                                            {percent && (response.onCourse ? '100.0' : '0.0')}
                                        </td>
                                        <td>
                                            {!percent && (response.total || 0)}
                                            {percent && (divide(response.total, response.onCourse))}
                                        </td>
                                        <td>
                                            {!percent && (response.response || 0)}
                                            {percent && divide(response.response, response.total)}
                                        </td>
                                        <td>
                                            {!percent && (response.noResponse || 0)}
                                            {percent && divide(response.noResponse, response.total)}
                                        </td>
                                        <td>
                                            {!percent && (response.firstCause || 0)}
                                            {percent && divide(response.firstCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.secondCause || 0)}
                                            {percent && divide(response.secondCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.thirdCause || 0)}
                                            {percent && divide(response.thirdCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.fourthCause || 0)}
                                            {percent && divide(response.fourthCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.fifthCause || 0)}
                                            {percent && divide(response.fifthCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.sixthCause || 0)}
                                            {percent && divide(response.sixthCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.seventhCause || 0)}
                                            {percent && divide(response.seventhCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.eigthCause || 0)}
                                            {percent && divide(response.eigthCause, response.noResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.householdTotal || 0)}
                                            {percent && (response.householdTotal ? '100.0' : '0.0')}
                                        </td>
                                        <td>
                                            {!percent && (response.householdResponse || 0)}
                                            {percent && divide(response.householdResponse, response.householdTotal)}
                                        </td>
                                        <td>
                                            {!percent && (response.householdNoResponse || 0)}
                                            {percent && divide(response.householdNoResponse, response.householdTotal)}
                                        </td>
                                        <td>
                                            {!percent && (response.householdFirstCause || 0)}
                                            {percent &&
                                            divide(response.householdFirstCause, response.householdNoResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.householdSecondCause || 0)}
                                            {percent &&
                                            divide(response.householdSecondCause, response.householdNoResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.householdThirdCause || 0)}
                                            {percent &&
                                            divide(response.householdThirdCause, response.householdNoResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.membersTotal || 0)}
                                            {percent && (response.membersTotal ? '100.0' : '0.0')}
                                        </td>
                                        <td>
                                            {!percent && (response.membersResponse || 0)}
                                            {percent && divide(response.membersResponse, response.membersTotal)}
                                        </td>
                                        <td>
                                            {!percent && (response.membersNoResponse || 0)}
                                            {percent && divide(response.membersNoResponse, response.membersTotal)}
                                        </td>
                                        <td>
                                            {!percent && (response.membersFirstCause || 0)}
                                            {percent && divide(response.membersFirstCause, response.membersNoResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.membersSecondCause || 0)}
                                            {percent && divide(response.membersSecondCause, response.membersNoResponse)}
                                        </td>
                                        <td>
                                            {!percent && (response.membersThirdCause || 0)}
                                            {percent && divide(response.membersThirdCause, response.membersNoResponse)}
                                        </td>
                                    </tr>)
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        responseMonitoring: state.monitoring.responseMonitoring,
        loading: state.monitoring.loading
    }),
    dispatch => ({
        fetchResponseMonitoring: filters => dispatch(fetchResponseMonitoring(filters))
    })
)(MonitoringResponse);
