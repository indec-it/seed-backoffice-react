import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {sortBy, sortedUniq, map, filter, parseInt, isEmpty, concat} from 'lodash';

import {DropDown} from '../../common/fields';
import {surveyStateTranslate} from '../../../constants';

const getAreas = (regionAreas, ups) => sortBy(
    map(
        filter(regionAreas, areas => areas.ups === parseInt(ups)),
        areas => areas.area
    )
);

const getUPS = regionUPS => sortedUniq(sortBy(map(regionUPS, ups => ups.ups)));

const handleChangeState = (state, fetchStateInfo, onChange) => {
    if (!isEmpty(state)) {
        fetchStateInfo(state);
    }
    onChange({
        stateId: state, ups: null, area: null, pollster: null
    });
};

const SearchParams = ({
    states, stateInfo, usersList, onChange, onSearch, fetchStateInfo,
    searchParams: {
        stateId, ups, area, status, user
    }
}) => (
    <Form>
        <Row className="review-list-filter">
            <Col md={2} className="text-center">
                Jurisdicción
                {states &&
                <DropDown
                    value={stateId}
                    onChange={e => handleChangeState(e.target.value, fetchStateInfo, onChange)}
                >
                    <option value="">[Seleccione]</option>
                    {states.map(state => <option value={state._id} key={state._id}>{state.name}</option>)}
                </DropDown>}
            </Col>
            <Col md={2} className="text-center">
                UPS
                <DropDown
                    value={ups}
                    onChange={e => onChange({ups: e.target.value, area: ''})}
                >
                    <option value="">[Seleccione]</option>
                    {stateInfo && getUPS(stateInfo).map(u =>
                        <option value={u} key={u}>{u}</option>)
                    }
                </DropDown>
            </Col>
            <Col md={2} className="text-center">
                Área
                <DropDown
                    value={area}
                    onChange={e => onChange({area: e.target.value})}
                >
                    <option value="">[Todos]</option>
                    {stateInfo && getAreas(stateInfo, ups).map(a =>
                        <option value={a} key={a}>{a}</option>)
                    }
                </DropDown>
            </Col>
            <Col md={2} className="text-center">
                Estado
                <DropDown
                    value={status}
                    onChange={e => onChange({status: e.target.value})}
                >
                    <option value="">[Todos]</option>
                    {stateInfo && surveyStateTranslate.map(info =>
                        <option value={info._id} key={info.description}>{info.description}</option>)
                    }
                </DropDown>
            </Col>
            <Col md={3} className="text-center">
                Jefe de Equipo/Encuestador
                <Select
                    value={user}
                    addLabelText=">Jefe de Equipo/Encuestador<"
                    options={usersList &&
                    concat(
                        [{value: '', label: '[Todos]'}],
                        usersList
                    )
                    }
                    onChange={e => onChange({user: e.value})}
                    placeholder="Jefe de Equipo/Encuestador"
                    noResultsText="No se encontraron resultados"
                    clearValueText="Limpiar Filtro"
                />
            </Col>
            <Col md={1} className="text-center">
                <br/>
                {stateId && ups &&
                <Button onClick={e => onSearch(e)} type="submit">
                    <FontAwesome name="search"/>
                </Button>
                }
            </Col>
        </Row>
    </Form>
);

SearchParams.propTypes = {
    fetchStateInfo: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    searchParams: PropTypes.shape({
        stateId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        ups: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        area: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        status: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        pollster: PropTypes.string.isRequired
    }).isRequired,
    states: PropTypes.arrayOf(PropTypes.shape()),
    usersList: PropTypes.arrayOf(PropTypes.shape()),
    stateInfo: PropTypes.arrayOf(PropTypes.shape())
};

SearchParams.defaultProps = {
    states: null,
    usersList: null,
    stateInfo: null
};

export default SearchParams;
