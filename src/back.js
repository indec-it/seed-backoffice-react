/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Root from './containers/Root';
import Back from './components/Back';
import configureStore from './store';
import './sass/back.scss';

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Root store={store} comp={Back}/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {
    module.hot.accept('./components/Back', render);
}
