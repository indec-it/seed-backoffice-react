import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import RouterWithSession from './Routes/WithSession';
import RouterOffline from './Routes/Offline';
import Loading from './Routes/Loading';

import {User} from '../../model';

import {anErrorOccurred as errorDispatch, setIsMobile} from '../../actions';

class Main extends Component {
    static propTypes = {
        isMobile: PropTypes.bool.isRequired,
        profile: PropTypes.instanceOf(User),
        loading: PropTypes.bool.isRequired,
        anErrorOccurred: PropTypes.bool.isRequired,
        setIsMobile: PropTypes.func.isRequired,
        handleErrorEvent: PropTypes.func.isRequired
    }

    static defaultProps = {
        profile: null
    };

    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    componentDidCatch() {
        this.props.handleErrorEvent(
            {anErrorOccurred: true, errorMsg: 'algo salio mal, intenta mas tarde'}
        );
    }

    resize() {
        const mobile = (window.innerWidth < 740);
        const {isMobile} = this.props;
        if (mobile !== isMobile) {
            this.props.setIsMobile(mobile);
        }
    }

    render() {
        const {profile, anErrorOccurred, loading} = this.props;
        if (loading) {
            return (<Loading/>);
        }
        if (profile instanceof User && profile.isValid()) {
            return (<RouterWithSession {...{profile, anErrorOccurred}}/>);
        }
        return (<RouterOffline/>);
    }
}

export default connect(
    state => state.session,
    dispatch => ({
        handleErrorEvent: error => dispatch(errorDispatch(error)),
        setIsMobile: isMobile => dispatch(setIsMobile(isMobile))
    })
)(Main);
