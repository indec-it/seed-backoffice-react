import React, {Fragment} from 'react';
import {hot} from 'react-hot-loader';

import Main from './Main';
import AppModal from './AppModal';

const App = () => (
    <Fragment>
        <AppModal/>
        <Main/>
    </Fragment>
);

export default hot(module)(App);
