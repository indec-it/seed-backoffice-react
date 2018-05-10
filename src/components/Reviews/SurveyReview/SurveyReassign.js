import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import FontAwesome from 'react-fontawesome';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';

const renderPopopver = (
    usersList, surveyAddress, pollster, onChange, onSubmit
) => (
    <Popover id="reassignPopover" className="text-center popover-reasign">
        Asignado a: <span>{surveyAddress.pollsterName}</span>
        <hr/>
        Reasignar a:<br/>
        <Select
            value={!isEmpty(pollster) ? pollster._id : surveyAddress.pollster}
            options={usersList}
            onChange={e => onChange(e)}
            placeholder="Seleccione"
            noResultsText="No se encontraron resultados"
            clearValueText="Limpiar Filtro"
        />
        <br/>
        <Button onClick={() => onSubmit()} className="btn-block">Continue Reasignación</Button>
    </Popover>
);

const SurveyReassign = ({
    surveyAddress, usersList, onSubmit, onChange, pollster
}) => (
    <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose
        overlay={
            renderPopopver(usersList, surveyAddress, pollster, onChange, onSubmit)
        }
    >
        <Button>
            <FontAwesome name="user-plus"/> Reasignar
        </Button>
    </OverlayTrigger>
);

SurveyReassign.propTypes = {
    surveyAddress: PropTypes.shape({}).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    usersList: PropTypes.arrayOf(PropTypes.shape({})),
    pollster: PropTypes.shape({})
};

SurveyReassign.defaultProps = {
    pollster: null,
    usersList: null
};

export default connect(
    state => ({
        usersList: state.review.usersList
    })
)(SurveyReassign);
