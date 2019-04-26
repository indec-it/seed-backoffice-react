import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover,
    Row,
    Button,
    Col
} from 'reactstrap';
import {get, map, uniqueId} from 'lodash';

uniqueId('detail');

const renderPopover = (info, columns, id) => (
    <UncontrolledPopover
        target={id}
        placement="top"
        trigger="hover"
        className="popover-info"
    >
        <PopoverHeader className="text-white">&nbsp;&nbsp;&nbsp;Detalles</PopoverHeader>
        <PopoverBody>
            {map(columns, column => !column.noInfo && (
                <Row key={uniqueId()}>
                    <Col sm="4">
                        <strong>
                            {column.text}
                        :
                        </strong>
                    </Col>
                    <Col sm="8">
                        {get(info, column.label)}
                    </Col>
                </Row>
            ))}
        </PopoverBody>
    </UncontrolledPopover>
);

const Details = ({
    info, columns, children
}) => {
    const id = `b${uniqueId()}`;
    return (
        <Fragment>
            <Button size="sm" id={id} type="button">{children}</Button>
            {renderPopover(info, columns, id)}
        </Fragment>
    );
};

Details.propTypes = {
    children: PropTypes.element.isRequired,
    info: PropTypes.shape({
        code: PropTypes.string,
        description: PropTypes.string
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

Details.defaultProps = {
    info: null
};

export default Details;
