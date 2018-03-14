import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

import * as reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    debug: __DEV__,
    blacklist: ['form']
};

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);
export const reduxBoundAddListener = createReduxBoundAddListener('root');

const middlewares = [thunk, navMiddleware];

if (__DEV__) {
    middlewares.push(logger);
}

const Reducer = persistCombineReducers(persistConfig, reducers);
export const store = createStore(
    Reducer,
    {},
    compose(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);

// clears async storage
persistor.purge();

export default { persistor, store };
