import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import FontAwesome from 'react-fontawesome';

import {fieldMaterialsRequest} from '../../../actions/fieldMaterials';
import LoadingButton from '../../common/LoadingButton';

class FieldMaterialsList extends Component {
    static propTypes = {
        fieldMaterialsRequest: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        fieldMaterials: PropTypes.arrayOf(PropTypes.shape()),
        match: PropTypes.shape({
            params: PropTypes.shape({}).isRequired
        }),
        history: PropTypes.shape({
            goBack: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        fieldMaterials: null,
        match: null
    };

    componentWillMount() {
        const {params} = (this.props.match && this.props.match) || {};
        this.props.fieldMaterialsRequest(params);
    }

    componentWillReceiveProps({match: {params}}) {
        if (params !== this.props.match.params) {
            this.props.fieldMaterialsRequest(params);
        }
    }

    render() {
        const {fieldMaterials, loading, match} = this.props;
        return (
            <Grid>
                <Row className="monitoring">
                    <Col sm={12}>
                        <h2>
                            <FontAwesome name="list"/> Composición de la muestra
                            {match.params.stateId &&
                            <Button
                                onClick={() => this.props.history.goBack()}
                            >
                                Volver <FontAwesome name="history"/>
                            </Button>}
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
                        <Table responsive striped bordered condensed hover className="table-vertical-middle">
                            <thead>
                                <tr>
                                    <th>Jurisdicción</th>
                                    {!isEmpty(fieldMaterials) && fieldMaterials[0].amountUps && <th>Cant. ups</th>}
                                    {!isEmpty(fieldMaterials) && fieldMaterials[0].amountArea && <th>Cant. áreas</th>}
                                    {!isEmpty(fieldMaterials) && fieldMaterials[0].amountDwelling
                                    && <th>Cant. viviendas</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {loading &&
                                <tr>
                                    <td colSpan={26} className="text-center"><LoadingButton label="Cargando..."/></td>
                                </tr>}
                                {!loading && !isEmpty(fieldMaterials) && fieldMaterials.map(s => (
                                    <tr key={s.stateName + s.ups + s.area}>
                                        <td>
                                            <Button
                                                componentClass={Link}
                                                to={(
                                                    s.area && `/fieldMaterials/dwelling/${s.stateId}/${s.ups}/${s.area}`
                                                )
                                                || (s.ups && `/fieldMaterials/${s.stateId}/${s.ups}`) ||
                                                `/fieldMaterials/${s.stateId}`}
                                            >
                                                <FontAwesome name="align-justify"/>
                                                {s.stateId && ` ${s.stateName}`}
                                                {s.ups && ` UPS: ${s.ups}`}
                                                {s.area && ` Area: ${s.area}`}
                                            </Button>
                                        </td>
                                        {s.amountUps && <td>{s.amountUps}</td>}
                                        {s.amountArea && <td>{s.amountArea}</td>}
                                        {s.amountDwelling && <td>{s.amountDwelling}</td>}
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
        fieldMaterials: state.fieldMaterials.fieldMaterials,
        loading: state.fieldMaterials.loading
    }),
    dispatch => ({
        fieldMaterialsRequest: filters => dispatch(fieldMaterialsRequest(filters))
    })
)(FieldMaterialsList);
