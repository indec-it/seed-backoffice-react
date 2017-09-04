import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Grid, Row, Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {requestLogs} from '../../actions';
import {Log} from '../../model';

class PeopleList extends Component {
    static propTypes = {
        requestLogs: PropTypes.func.isRequired,
        logs: PropTypes.arrayOf(
            PropTypes.instanceOf(Log)
        )
    };

    static defaultProps = {
        logs: []
    };

    componentDidMount() {
        this.props.requestLogs();
    }

    render() {
        const {logs} = this.props;
        return (
            <Grid>
                <Row>
                    <Col sm={8}>
                        <h2>
                            <FontAwesome name="stack-overflow"/> Log
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table responsive striped bordered condensed hover className="table-vertical-middle">
                            <thead>
                                <tr>
                                    <th>Id/Timestamp</th>
                                    <th>Error</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs && logs.map(log => (
                                    <tr key={log._id}>
                                        <td>
                                            {log._id}
                                            <br/>
                                            {log.timestamp}
                                        </td>
                                        <td>{log.message}</td>
                                    </tr>
                                ))}
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
        logs: state.log.logs
    }),
    dispatch => ({
        requestLogs: () => dispatch(requestLogs())
    })
)(PeopleList);
