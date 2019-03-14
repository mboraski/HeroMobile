// 3rd Party Libraries
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { getUser } from '../selectors/authSelectors';
import { firebaseAuth } from '../../firebase';
import Color from '../constants/Color';
import { statusBarOnly } from '../constants/Style';

class LoadingScreen extends Component {
    static navigationOptions = statusBarOnly;

    componentDidMount() {
        const { authLoaded, user, navigation } = this.props;
        if (authLoaded) {
            return user && firebaseAuth.currentUser
                ? navigation.navigate('map')
                : navigation.navigate('welcome');
        }
    }

    componentWillUpdate(prevProps) {
        const { authLoaded, user, navigation } = this.props;
        if (!prevProps.authLoaded && authLoaded) {
            return user && firebaseAuth.currentUser
                ? navigation.navigate('map')
                : navigation.navigate('welcome');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating
                    size="large"
                    color={Color.DEFAULT}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.WHITE
    }
});

const mapStateToProps = state => ({
    user: getUser(state),
    authLoaded: state.auth.loaded
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen);
