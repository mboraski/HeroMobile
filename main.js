// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Expo, { Font } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

// Relative Imports
import splashImage from './src/assets/splash.png';
import Color from './src/constants/Color';
import RootContainer from './src/containers/RootContainer';
import { store, persistor } from './src/store';

// TODO: Here until a solution can be found.
console.ignoredYellowBox = ['Setting a timer'];

class App extends Component {
    state = {
        loading: true
    };

    async componentDidMount() {
        const fonts = {
            goodtimes: require('./src/assets/fonts/goodtimes.ttf'), // eslint-disable-line global-require
            roboto: require('./src/assets/fonts/roboto.ttf') // eslint-disable-line global-require
        };

        await Font.loadAsync(fonts);
        this.setState({ loading: false });
    }

    render() {
        return this.state.loading ? (
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#f5a623" />
            </View>
        ) : (
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
        backgroundColor: Color.DEFAULT
    },
    overlay: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
});

Expo.registerRootComponent(App);
