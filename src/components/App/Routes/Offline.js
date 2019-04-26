import React, {Fragment} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Footer from '../Footer';
import SignIn from '../../SignIn';
import Welcome from './Welcome';

export default () => (
    <HashRouter>
        <Fragment>
            <main>
                <Switch>
                    <Route path="/" component={Welcome} exact/>
                    <Route path="/signIn" component={SignIn} exact/>
                    <Route component={Welcome}/>
                </Switch>
            </main>
            <Footer/>
        </Fragment>
    </HashRouter>
);
