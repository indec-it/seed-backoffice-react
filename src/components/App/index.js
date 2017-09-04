import React from 'react';
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

export default App;
