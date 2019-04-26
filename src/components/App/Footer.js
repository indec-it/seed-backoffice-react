import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container, Row, Col, Media
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';

import {User} from '../../model';

const Footer = ({profile}) => {
    if (profile && profile.isValid()) {
        return (
            <footer className="hidden-print">
                <Container>
                    <Row>
                        <Col sm="2" className="text-left">
                            <div className="text-small">
                                <small className="texts">
                                    SEED
                                </small>
                            </div>
                            <div className="version">
                                Version&nbsp;
                                {VERSION}
                            </div>
                        </Col>
                        {profile && (
                            <Col sm="2">
                                <div className="texts">
                                    <FontAwesomeIcon icon={faIdCard}/>
                                    &nbsp;
                                    {profile.surname}
                                    ,
                                    &nbsp;
                                    {profile.name}
                                </div>
                            </Col>
                        )}
                        <Col sm="4" className="text-center">
                            Links
                        </Col>
                        <Col sm="4" className="text-right">
                            <Media
                                object
                                href="https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg"
                                data-src="https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg"
                                alt="img"
                            />
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }

    return (
        <footer className="hidden-print">
            <Container>
                <Row>
                    <Col sm="6">
                        <span className="texts">
                            SEED
                        </span>
                        <div className="version">
                            Version&nbsp;
                            {VERSION}
                        </div>
                    </Col>
                    <Col sm="6" className="text-right">
                        <Media
                            object
                            href="https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg"
                            data-src="https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg"
                            alt="img"
                        />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

Footer.propTypes = {
    profile: PropTypes.instanceOf(User)
};

Footer.defaultProps = {
    profile: null
};

export default connect(state => state.session)(Footer);
