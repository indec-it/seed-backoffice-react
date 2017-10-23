import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import {requestUser, requestSaveUser} from '../../../actions';
import {User} from '../../../model';

import LoadingButton from '../../common/LoadingButton';

class UserEditor extends Component {
    static propTypes = {
        requestUser: PropTypes.func.isRequired,
        requestSaveUser: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string
            })
        }).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        user: PropTypes.instanceOf(User),
        saving: PropTypes.bool.isRequired
    };

    static defaultProps = {
        user: new User()
    };

    constructor(props) {
        super(props);
        this.state = {user: new User()};
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        if (id) {
            this.props.requestUser(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.state.user = nextProps.user;
        }
        if (!nextProps.saving && this.props.saving) {
            this.props.history.push('/users');
        }
    }

    handleSubmit() {
        const {user} = this.state;
        this.props.requestSaveUser(user);
    }

    render() {
        const {saving} = this.props;
        return (
            <Grid>
                <Row>
                    <Col sm={12}>
                        <h2>
                            <FontAwesome name="user"/> Usuario
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row className="text-right">
                    <Col sm={2} smOffset={10}>
                        {saving && <LoadingButton/>}
                        {!saving &&
                        <Button
                            bsStyle="primary"
                            onClick={() => this.handleSubmit()}
                            className="btn-group-justified"
                        >
                            <FontAwesome name="floppy-o"/> Guardar
                        </Button>}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        user: state.user.users,
        saving: state.user.saving
    }),
    dispatch => ({
        requestUser: id => dispatch(requestUser(id)),
        requestSaveUser: user => dispatch(requestSaveUser(user))
    })
)(UserEditor);
