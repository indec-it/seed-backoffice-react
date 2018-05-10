import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Col, Row, Button, Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {first, get, isEmpty} from 'lodash';
import ReactToPrint from 'react-to-print';

import LoadingButton from '../../common/LoadingButton';
import {fieldMaterialsRequest} from '../../../actions/fieldMaterials';

const subSample = data => {
    if (data === 1) {
        return (<i style={{fontSize: '16px'}} className="fa">&#xf069;</i>);
    }
    return null;
};

class DwellingList extends Component {
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
        match: null,
        fieldMaterials: null
    };

    componentDidMount() {
        const {params} = (this.props.match) || {};
        this.props.fieldMaterialsRequest(params);
    }

    componentWillReceiveProps({match: {params}}) {
        if (!isEmpty(params) && params !== this.props.match.params) {
            this.props.fieldMaterialsRequest(params);
        }
    }

    render() {
        const {loading, match, fieldMaterials} = this.props;
        /* eslint no-return-assign: 0 */
        return (
            <Fragment>
                <Grid>
                    <Row className="monitoring">
                        <Col md={9}>
                            <h2>
                                <FontAwesome name="list"/> Listado de Selección de Viviendas
                            </h2>
                        </Col>
                        <Col md={3} className="text-right">
                            <br/>
                            <Button
                                onClick={() => this.props.history.goBack()}
                            >
                                <FontAwesome name="history"/> Volver
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <hr className="hr-title"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col smOffset={9} sm={3} className="text-right">
                            <ReactToPrint
                                trigger={() => (
                                    <Button href="#">
                                        <FontAwesome name="print"/> Imprimir
                                    </Button>
                                )}
                                content={() => this.componentRef}
                                copyStyles
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={12}>
                            {!loading &&
                            <Table
                                striped
                                bordered
                                hover
                                className="table-vertical-middle"
                                ref={el => this.componentRef = el}
                            >
                                <thead>
                                    <tr>
                                        <th colSpan={5}>
                                            Jurisdicción:&nbsp;
                                            {!isEmpty(fieldMaterials) && get(first(fieldMaterials), 'stateName')}
                                        </th>
                                        <th colSpan={5}>
                                            UPS: {match.params.ups}
                                        </th>
                                        <th colSpan={5}>
                                            Área: {match.params.area}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Submuestra</th>
                                        <th>Marca</th>
                                        <th>Manz.</th>
                                        <th>Lado</th>
                                        <th>Entidad</th>
                                        <th>N list.</th>
                                        <th>Calle</th>
                                        <th>Nro</th>
                                        <th>Piso</th>
                                        <th>Dpto</th>
                                        <th>Hab.</th>
                                        <th>Viv.</th>
                                        <th>Sector</th>
                                        <th>Edif.</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fieldMaterials && fieldMaterials.map(s => (
                                        <tr key={s._id}>
                                            <td className="text-center">{subSample(s.subSample)}</td>
                                            <td>{s.mark}</td>
                                            <td className="text-center">{s.block}</td>
                                            <td className="text-center">{s.side}</td>
                                            <td>{s.entityName}</td>
                                            <td className="text-center">{s.listNumber}</td>
                                            <td>{s.street}</td>
                                            <td className="text-center">{s.streetNumber}</td>
                                            <td className="text-center">{s.floor}</td>
                                            <td className="text-center">{s.department}</td>
                                            <td className="text-center">{s.room}</td>
                                            <td className="text-center">{s.type}</td>
                                            <td className="text-center">{s.sector}</td>
                                            <td className="text-center">{s.building}</td>
                                            <td>{s.description}</td>
                                        </tr>)
                                    )}
                                </tbody>
                            </Table>}
                            {loading && <LoadingButton label="Cargando..."/>}
                        </Col>
                    </Row>
                </Grid>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        fieldMaterials: state.fieldMaterials.fieldMaterials,
        loading: state.fieldMaterials.loading
    }),
    dispatch => ({fieldMaterialsRequest: filters => dispatch(fieldMaterialsRequest(filters))})
)(DwellingList);
