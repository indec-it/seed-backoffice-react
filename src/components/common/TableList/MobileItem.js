import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Row,
    Col,
    ButtonGroup
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faEraser,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import {
    get,
    isArray,
    join,
    map,
    filter,
    size,
    uniqueId
} from 'lodash';

import Detail from './Detail';

uniqueId('mobileItem');

const Item = ({
    info,
    onDelete,
    primaryKey,
    columns,
    headers
}) => (
    <div className="bordered-div">
        <Row>
            {map(filter(columns, c => !c.linkTo && !c.deleteAction && c.draw), (column, i) => (
                <Col
                    sm={12 / (size(headers) - 2)}
                    key={uniqueId()}
                >
                    {column.detail && (
                        <Fragment>
                            <h4 className="bg-dark">
                                { headers[i].label }
                            </h4>
                            <Detail
                                info={info}
                                columns={columns}
                            >
                                <div>
                                    <FontAwesomeIcon icon={faEye}/>
                                    {!isArray(column.label) && get(info, column.label) }
                                    { isArray(column.label) && join(map(column.label, e => get(info, e)), ', ') }
                                </div>
                            </Detail>
                        </Fragment>
                    )}
                    {!column.detail && (
                        <Fragment>
                            <h4 className="bg-dark">
                                { headers[i].label }
                            </h4>
                            {!isArray(column.label) && get(info, column.label) }
                            { isArray(column.label) && join(map(column.label, e => get(info, e)), ', ') }
                        </Fragment>
                    )}
                </Col>
            ))}
        </Row>
        <Row>
            <Col sm="12">
                <h4 className="bg-dark">
                    &nbsp;&nbsp;&nbsp; Acciones
                </h4>
                <ButtonGroup>
                    {map(filter(columns, c => c.draw && (c.linkTo || c.deleteAction)), column => {
                        if (column.linkTo) {
                            return (
                                <Button
                                    componentClass={Link}
                                    to={`${column.linkTo}${primaryKey}`}
                                    bsSize="sm"
                                    key={uniqueId()}
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                    { column.label }
                                </Button>
                            );
                        }
                        return (
                            <Button
                                onTouchStart={() => onDelete({id: primaryKey, ...info})}
                                color="danger"
                                bsSize="sm"
                                key={uniqueId()}
                            >
                                <FontAwesomeIcon icon={faEraser}/>
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </Col>
        </Row>
    </div>
);

Item.propTypes = {
    primaryKey: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]).isRequired,
    info: PropTypes.shape({}).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onDelete: PropTypes.func.isRequired,
    headers: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default Item;
