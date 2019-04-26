import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table} from 'reactstrap';
import {get, map, uniqueId} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Item from './Item';
import MobileItem from './MobileItem';
import Pagination from '../Pagination';

uniqueId('indexDetail');

/**
 * @param {Object} Object
 * @param {Array} Object.headers
 */
const TableList = ({
    information,
    primaryKey,
    headers,
    columns,
    onDelete,
    isMobile,
    onPageChange,
    size,
    current,
    total
}) => (isMobile ? (
    <Fragment>
        {map(information, info => (
            <MobileItem
                info={info}
                key={get(info, primaryKey)}
                primaryKey={get(info, primaryKey)}
                columns={columns}
                onDelete={onDelete}
                headers={headers}
            />
        ))}
        <Pagination
            {... {
                size,
                current,
                total
            }}
            hideTotals={isMobile}
            onClick={page => onPageChange(page)}
        />
    </Fragment>
) : (
    <Table
        bordered
        condensed
        striped
        size="sm"
    >
        <thead>
            <tr>
                {map(headers, header => (
                    <th key={uniqueId()}>
                        {header.icon && (<FontAwesomeIcon icon={header.icon}/>)}
                        {header.label}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {map(information, info => (
                <Item
                    info={info}
                    key={get(info, primaryKey)}
                    primaryKey={get(info, primaryKey)}
                    columns={columns}
                    onDelete={onDelete}
                />
            ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={headers.length}>
                    <Pagination
                        {...{
                            size,
                            current,
                            total
                        }}
                        onClick={page => onPageChange(page)}
                    />
                </td>
            </tr>
        </tfoot>
    </Table>
));

TableList.propTypes = {
    information: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    primaryKey: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element,
                PropTypes.any
            ])
        })
    ).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDelete: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onPageChange: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default connect(state => state.session)(TableList);
