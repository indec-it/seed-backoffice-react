/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Root from './containers/Root';
import App from './components/App';
import configureStore from './store';
import './sass/app.scss';

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Root store={store} comp={App}/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {
    module.hot.accept('./components/App', render);
}
