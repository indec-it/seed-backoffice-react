import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Container,
    Media,
    Row
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {User} from '../../../model';

function Welcome({profile}) {
    return (
        <Container>
            <Row>
                <Col sm="12" className="text-center">
                    <Media
                        object
                        data-src="https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg"
                        alt="img"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="12" className="text-center margin-top-splash">
                    <h3>
                        @INDEC
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col sm="12" className="text-center">
                    <h3>
                        SEED-BO
                    </h3>
                </Col>
            </Row>
            <hr className="margin-top-splash"/>
            <Row>
                <Col sm="12" className="text-center ">
                    <h4>
                        <Link to={profile && !isEmpty(profile._id) ? '' : '/signIn'}>
                            <FontAwesomeIcon icon={faLock}/>
                            &nbsp;Ingreso al sistema
                        </Link>
                    </h4>
                </Col>
            </Row>
        </Container>
    );
}

Welcome.propTypes = {
    profile: PropTypes.instanceOf(User)
};

Welcome.defaultProps = {
    profile: null
};

export default connect(
    state => state.session
)(Welcome);
