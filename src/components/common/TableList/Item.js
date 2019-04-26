import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
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
    uniqueId
} from 'lodash';

import Detail from './Detail';

uniqueId('item');

const Item = ({
    info,
    onDelete,
    primaryKey,
    columns
}) => (
    <tr>
        {map(columns, column => {
            if (column.draw) {
                if (column.detail) {
                    return (
                        <td key={uniqueId()}>
                            <Detail
                                info={info}
                                columns={columns}
                            >
                                <div >
                                    <FontAwesomeIcon icon={faEye}/>
                                    &nbsp;
                                    {!isArray(column.label) && get(info, column.label) }
                                    { isArray(column.label) && join(map(column.label, e => get(info, e)), ', ') }
                                </div>
                            </Detail>
                        </td>
                    );
                }
                if (column.linkTo) {
                    return (
                        <td
                            className="text-center"
                            key={uniqueId()}
                        >
                            <Link
                                to={`${column.linkTo}${primaryKey}`}
                                className="btn btn-sm btn-secondary"
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                                { column.label }
                            </Link>
                        </td>
                    );
                }
                if (column.deleteAction) {
                    return (
                        <td
                            className="text-center"
                            key={uniqueId()}
                        >
                            <Button
                                onClick={() => onDelete({id: primaryKey, ...info})}
                                size="sm"
                                color="danger"
                            >
                                <FontAwesomeIcon icon={faEraser}/>
                            </Button>
                        </td>
                    );
                }
                return (
                    <td key={uniqueId()}>
                        {!isArray(column.label) && get(info, column.label) }
                        { isArray(column.label) && join(map(column.label, e => get(info, e)), ', ') }
                    </td>
                );
            }
            return null;
        })}
    </tr>
);

Item.propTypes = {
    primaryKey: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]).isRequired,
    info: PropTypes.shape({}).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Item;
