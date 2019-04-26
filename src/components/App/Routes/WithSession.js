import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {eq} from 'lodash';

import Footer from '../Footer';
import Header from '../Header';
import Home from '../../Home';
import Example from '../../Example';

const Routers = ({profile, anErrorOccurred}) => {
    if (profile && eq(profile.role, 'admin')) {
        return (
            <HashRouter>
                <Fragment>
                    <Header anErrorOccurred={anErrorOccurred}/>
                    <main>
                        <Switch>
                            <Route path="/" component={Home}/>
                            <Route path="/example" component={Example}/>
                        </Switch>
                    </main>
                    <Footer/>
                </Fragment>
            </HashRouter>
        );
    }
    return (
        <HashRouter>
            <Fragment>
                <Header anErrorOccurred={anErrorOccurred}/>
                <main>
                    <Switch>
                        <Route path="/" component={Home}/>
                    </Switch>
                </main>
                <Footer/>
            </Fragment>
        </HashRouter>
    );
};

Routers.propTypes = {
    profile: PropTypes.shape({}).isRequired,
    anErrorOccurred: PropTypes.bool.isRequired
};

export default Routers;
