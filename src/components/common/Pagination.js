import React from 'react';
import PropTypes from 'prop-types';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Col,
    Row
} from 'reactstrap';
import {times, uniqueId} from 'lodash';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faFastBackward,
    faStepBackward,
    faStepForward,
    faFastForward
} from '@fortawesome/free-solid-svg-icons';
import {DEFAULT_PAGE_SIZE} from '../../constants';

uniqueId('pagination');

/**
 * @param {Object} Object
 * @param {Function} Object.onClick
 * @param {Number} Object.size
 * @param {Number} Object.current
 * @param {Number} Object.total
 * @param {Boolean} Object.total
 */
const Paginate = ({
    onClick,
    size,
    current,
    total,
    hideTotals
}) => {
    const currentAmount = DEFAULT_PAGE_SIZE * (current + 1);
    const PAGE_SIZE_MINUS_ONE = DEFAULT_PAGE_SIZE - 1;
    const seeing = currentAmount > total ? total : currentAmount;
    return (
        <Row className="align-items-center">
            {!hideTotals && (
                <Col
                    sm="1"
                    md="1"
                >
                    <code>
                        { currentAmount > seeing ? currentAmount - PAGE_SIZE_MINUS_ONE : seeing - PAGE_SIZE_MINUS_ONE }
                        &nbsp;-&nbsp;
                        { seeing }
                        &nbsp;de&nbsp;
                        { total }
                    </code>
                </Col>
            )}
            <Col
                sm={{size: 10, offset: 1}}
                md={{size: 10, offset: 1}}
                className="align-self-center align-items-center"
            >
                <Pagination>
                    <PaginationItem>
                        <PaginationLink onClick={() => onClick(0)}>
                            <FontAwesomeIcon icon={faFastBackward}/>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous onClick={() => onClick(current - 1 < 0 ? 0 : current - 1)}>
                            <FontAwesomeIcon icon={faStepBackward}/>
                        </PaginationLink>
                    </PaginationItem>
                    {times(size, i => (
                        <PaginationItem
                            key={uniqueId()}
                            active={current === i}
                        >
                            <PaginationLink
                                onClick={() => onClick(i)}
                                onTouchStart={() => onClick(i)}
                            >
                                { i + 1 }
                            </PaginationLink>

                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationLink next onClick={() => onClick(current > size - 2 ? size - 1 : current + 1)}>
                            <FontAwesomeIcon icon={faStepForward}/>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last onClick={() => onClick(size - 1)}>
                            <FontAwesomeIcon icon={faFastForward}/>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Col>
        </Row>
    );
};

Paginate.propTypes = {
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    hideTotals: PropTypes.bool
};

Paginate.defaultProps = {
    hideTotals: false
};

export default Paginate;
