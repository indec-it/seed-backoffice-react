import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {includes} from 'lodash';

import Footer from './Footer';
import Header from './Header';

import Assign from '../Assign/DynamicAssign';
import Users from '../Users';
import FieldMaterials from '../FieldMaterials';
import Monitoring from '../Monitoring';
import Reviews from '../Reviews';
import Logs from '../Logs';
import Home from '../Home';
import ScheduledVisits from '../ScheduledVisits';
import Charts from '../Charts';

import {roles} from '../../constants';
import {User} from '../../model';
import {requestSession} from '../../actions';

class Routes extends Component {
    static propTypes = {
        fetchSession: PropTypes.func.isRequired,
        profile: PropTypes.instanceOf(User)
    };

    static defaultProps = {
        profile: null
    };
    componentDidMount() {
        this.props.fetchSession();
    }

    getRoutes() {
        const {profile} = this.props;
        if (profile && !includes(profile.roles, roles.POLLSTER)) {
            return (
                <Switch>
                    <Route path="/assign" component={Assign}/>
                    <Route path="/fieldMaterials" component={FieldMaterials}/>
                    <Route path="/logs" component={Logs}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/monitoring" component={Monitoring}/>
                    <Route path="/reviews" component={Reviews}/>
                    <Route path="/charts" component={Charts}/>
                    <Route path="/" component={Home} exact/>
                    <Route component={Home}/>
                </Switch>
            );
        }
        return (
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route component={Home}/>
            </Switch>
        );
    }

    render() {
        return (
            <HashRouter>

                <Fragment>
                    <Header/>
                    <main>
                        {this.getRoutes()}
                    </main>
                    <Footer/>
                </Fragment>
            </HashRouter>

        );
    }
}

export default connect(
    state => state.session,
    dispatch => ({
        fetchSession: () => dispatch(requestSession())
    })
)(Routes);
