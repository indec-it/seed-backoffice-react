/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import SignIn from './components/SignIn';
import './sass/sign-in.scss';

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <SignIn/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {
    module.hot.accept('./components/SignIn', render);
}
