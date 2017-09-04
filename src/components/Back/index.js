import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Users from '../Users';
import Logs from '../Logs';
import Home from '../Home';

import Footer from './Footer';
import Header from './Header';

const App = () => (
    <HashRouter>
        <div>
            <Header/>
            <main>
                <Switch>
                    <Route path="/logs" component={Logs}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </main>
            <Footer/>
        </div>
    </HashRouter>
);

export default App;
