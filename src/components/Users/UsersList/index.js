import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Table, ButtonToolbar, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {requestUsers} from '../../../actions';
import {User} from '../../../model';

class PeopleList extends Component {
    static propTypes = {
        requestUsers: PropTypes.func.isRequired,
        users: PropTypes.arrayOf(
            PropTypes.instanceOf(User)
        )
    };

    static defaultProps = {
        users: []
    };

    componentDidMount() {
        this.props.requestUsers();
    }

    render() {
        const {users} = this.props;
        return (
            <Grid>
                <Row>
                    <Col sm={8}>
                        <h2>
                            <FontAwesome name="users"/> Usuarios
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table responsive striped bordered condensed hover className="table-vertical-middle">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th className="text-center td-users-tools">
                                        <FontAwesome name="wrench"/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>
                                            <ButtonToolbar className="text-center">
                                                <Button
                                                    componentClass={Link}
                                                    to={`/users/${user._id}`}
                                                    title="Editar"
                                                >
                                                    <FontAwesome name="pencil"/>
                                                </Button>
                                            </ButtonToolbar>
                                        </td>
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
        users: state.user.users
    }),
    dispatch => ({
        requestUsers: () => dispatch(requestUsers())
    })
)(PeopleList);
