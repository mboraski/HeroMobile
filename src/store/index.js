import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';
// import logger from 'redux-logger';

import * as reducers from '../reducers';

const storage = createSecureStore();
const persistConfig = {
    timeout: 10000,
    key: 'root',
    storage,
    debug: __DEV__,
    blacklist: ['form']
};

const middlewares = [thunk];

// if (__DEV__) {
//     middlewares.push(logger);
// }

// // Enable debugging remotely in real device
// import { NativeModules } from 'react-native'
//
// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }

const Reducer = persistCombineReducers(persistConfig, reducers);
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(Reducer, {}, enhancer);
export const persistor = persistStore(store);

// clears async storage
// persistor.purge();

export default { persistor, store };
