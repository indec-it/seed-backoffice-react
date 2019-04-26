import {createStore, applyMiddleware} from 'redux';
import saga from 'redux-saga';

import loadAsyncState from './loadAsyncState';
import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = saga();

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);

    return loadAsyncState(store);
}
