/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import Back from './components/Back';
import configureStore from './store';
import './sass/back.scss';

const store = configureStore();

ReactDOM.render(
    <Root store={store} comp={Back}/>,
    document.getElementById('root')
);
