import React from 'react';
import {hot} from 'react-hot-loader';
import {HashRouter} from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

const App = () => (
    <HashRouter>
        <div>
            <Header/>
            <main>
                <a href="signIn.html">Iniciar sesión</a>
            </main>
            <Footer/>
        </div>
    </HashRouter>
);

export default hot(module)(App);
