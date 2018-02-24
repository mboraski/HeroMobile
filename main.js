// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

// Relative Imports
import splashImage from './src/assets/splash.png';
import Color from './src/constants/Color';
import RootContainer from './src/screens/RootContainer';
import { store, persistor } from './src/store';

class App extends Component {
    componentDidMount() {
        // TODO: HAMO-28: Wire up push notifications
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={
                        <Image
                            source={splashImage}
                            style={[StyleSheet.absoluteFill, styles.splash]}
                            resizeMode="contain"
                        />
                    }
                >
                    <RootContainer />
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    splash: {
        backgroundColor: Color.YELLOW_600
    }
});

Expo.registerRootComponent(App);
