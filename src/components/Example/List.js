import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Alert,
    Container,
    Row,
    Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';

import {actionModal, sampleColumns} from '../../constants';
import {
    SaveAlert,
    ModalConfirm,
    TableList
} from '../common';

import {
    requestSample
} from '../../actions/sample';

class List extends Component {
    static propTypes = {
        fetchSamples: PropTypes.func.isRequired,
        deleteSampleRequested: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        saving: PropTypes.bool.isRequired,
        samples: PropTypes.arrayOf(PropTypes.any),
        size: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
    }

    static defaultProps = {
        samples: null
    }

    constructor(props) {
        super(props);
        this.state = {
            modal: null,
            sample: null,
            current: 0
        };
    }

    componentDidMount() {
        this.props.fetchSamples();
    }

    handleDelete(sample) {
        this.setState(() => ({sample, modal: actionModal.DELETE}));
    }

    handlePagination(current) {
        this.setState(() => ({current}));
        this.props.fetchSamples(current);
    }

    render() {
        const {
            samples,
            loading,
            saving,
            size,
            total
        } = this.props;
        const {modal, sample, current} = this.state;
        return (
            <Container>
                <Row className="align-items-center">
                    <Col sm={10}>
                        <h2>
                            <FontAwesomeIcon icon={faBuilding}/>
                            &nbsp;&nbsp;Samples
                        </h2>
                    </Col>
                    <Col
                        sm={2}
                        className="align-self-end"
                    >
                        <br/>
                        <Link to="/#new" className="btn btn-info">Sample Nuevo</Link>
                    </Col>
                </Row>
                <hr/>
                <Row className="align-items-center">
                    <Col sm={12}>
                        <SaveAlert {...{saving, loading}}/>
                        {samples && (
                            <TableList
                                information={samples}
                                primaryKey="_id"
                                headers={[{label: 'Name'}, {label: 'Edit'}, {label: 'Delete'}]}
                                columns={sampleColumns}
                                onDelete={obj => this.handleDelete(obj)}
                                onPageChange={page => this.handlePagination(page)}
                                {...{size, total, current}}
                            />
                        )}
                        {!loading && !samples && (
                            <Alert color="info">
                                Not sample Available
                            </Alert>
                        )}
                    </Col>
                </Row>
                {modal === actionModal.DELETE && (
                    <ModalConfirm
                        onDismiss={() => this.setState({modal: null, sample: null})}
                        onAccept={() => this.props.deleteSampleRequested(sample.id)}
                        title="Confirme Baja de Sample"
                    >
                        <Alert color="danger">
                            Estás a punto de borrar la Sample&nbsp;
                            <strong>
                                {sample.subName}
                                &nbsp;-&nbsp;
                                {sample.name}
                            </strong>
                            , esta acción no se puede des hacer
                        </Alert>
                    </ModalConfirm>
                )}
            </Container>
        );
    }
}

export default connect(
    state => ({
        loading: state.sample.loading,
        samples: state.sample.samples,
        saving: state.sample.working,
        size: state.sample.size,
        total: state.sample.total
    }),
    dispatch => ({
        fetchSamples: skip => dispatch(requestSample(skip)),
        // eslint-disable-next-line
        deletedSampleRequested: _id => alert(`Estas Borrando ${_id}`)
    })
)(List);
