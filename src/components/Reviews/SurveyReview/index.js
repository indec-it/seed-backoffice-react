import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import {Grid, Col, Row, Alert} from 'react-bootstrap';
import {isEmpty} from 'lodash';

import Header from './Header';
import Dwellings from './Dwellings';

import {LoadingButton, ModalConfirm} from '../../common';
import {modalsEnum} from '../../../constants';
import {
    fetchSurvey,
    fetchStateInfo,
    requestReassignSurvey,
    requestApproveSurvey,
    requestReopenSurvey
} from '../../../actions/review';
import {User} from '../../../model';

class SurveyReview extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string.isRequired,
                stateId: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        success: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        fetchSurvey: PropTypes.func.isRequired,
        requestReassignSurvey: PropTypes.func.isRequired,
        requestApproveSurvey: PropTypes.func.isRequired,
        requestReopenSurvey: PropTypes.func.isRequired,
        fetchStateInfo: PropTypes.func.isRequired,
        profile: PropTypes.instanceOf(User).isRequired,
        surveyAddress: PropTypes.shape({}),
        usersList: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        surveyAddress: null,
        usersList: null
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: null,
            pollster: {}
        };
    }

    componentDidMount() {
        const {match: {params: {id, stateId}}, usersList} = this.props;
        if (!usersList) {
            this.props.fetchStateInfo(stateId);
        }
        this.props.fetchSurvey(id, stateId);
    }

    handleChangePollster(pollster) {
        this.setState({pollster});
    }

    handleReassignSurvey() {
        const {surveyAddress} = this.props;
        const {pollster} = this.state;
        this.props.requestReassignSurvey(surveyAddress._id, pollster._id);
        this.handleCloseModal();
    }

    handleApproveSurvey() {
        const {surveyAddress} = this.props;
        this.props.requestApproveSurvey(surveyAddress._id);
        this.handleCloseModal();
    }

    handleReopenSurvey() {
        const {surveyAddress} = this.props;
        this.props.requestReopenSurvey(surveyAddress._id);
        this.handleCloseModal();
    }

    handleOpenModal(modal) {
        this.setState(() => ({modal}));
    }

    handleCloseModal() {
        this.setState(() => ({modal: null}));
    }

    render() {
        const {
            surveyAddress, profile, success, loading
        } = this.props;
        const {modal, pollster} = this.state;
        return (
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <h2>
                            <FontAwesome name="pencil-square-o"/> Encuesta
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col sm={6} smOffset={3}>
                        {success && <Alert bsStyle="success">Guardado con exito</Alert>}
                        {loading && <LoadingButton label="Cargando..."/>}
                    </Col>
                </Row>
                {surveyAddress &&
                <section>
                    <Row>
                        <Header
                            onOpenModal={modalType => this.handleOpenModal(modalType)}
                            profile={profile}
                            surveyAddress={
                                {
                                    _id: surveyAddress._id,
                                    pollster: surveyAddress.pollster,
                                    pollsterName: surveyAddress.pollsterName,
                                    surveyAddressState: surveyAddress.surveyAddressState,
                                    valid: surveyAddress.valid
                                }
                            }
                            onChange={p => this.handleChangePollster(p)}
                            pollster={pollster}
                        />
                    </Row>
                    <Dwellings surveyAddress={surveyAddress}/>
                </section>}
                {modalsEnum.REASSIGN_SURVEY === modal && !isEmpty(pollster) &&
                pollster._id !== surveyAddress.pollster &&
                <ModalConfirm
                    title="Reasignar encuesta"
                    message={`Reasignación de ${surveyAddress.pollsterName} a ${pollster.label}`}
                    onAccept={() => this.handleReassignSurvey()}
                    onDismiss={() => this.handleCloseModal()}
                />}
                {modalsEnum.APPROVE_SURVEY === modal &&
                <ModalConfirm
                    title="Aprobar encuesta"
                    message="Confirme la aprobación"
                    onAccept={() => this.handleApproveSurvey()}
                    onDismiss={() => this.handleCloseModal()}
                />}
                {modalsEnum.REOPEN_SURVEY === modal &&
                <ModalConfirm
                    title="Reabrir encuesta"
                    message="Confirme la reapertura"
                    onAccept={() => this.handleReopenSurvey()}
                    onDismiss={() => this.handleCloseModal()}
                />}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        surveyAddress: state.review.surveyAddress,
        profile: state.session.profile,
        loading: state.review.loading,
        usersList: state.review.usersList,
        success: state.review.success,
        working: state.review.working
    }),
    dispatch => ({
        fetchSurvey: (id, stateId) => dispatch(fetchSurvey(id, stateId)),
        requestReassignSurvey: (surveyAddressId, pollster) => dispatch(
            requestReassignSurvey(surveyAddressId, pollster)
        ),
        requestApproveSurvey: surveyAddress => dispatch(requestApproveSurvey(surveyAddress)),
        requestReopenSurvey: surveyAddress => dispatch(requestReopenSurvey(surveyAddress)),
        fetchStateInfo: stateId => dispatch(fetchStateInfo(stateId))
    })
)(SurveyReview);
