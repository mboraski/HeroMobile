import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { firebaseAuth } from '../../firebase';
import { statusBarOnly } from '../constants/Style';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import Slides from '../components/Slides';
import { setFirstTimeOpened } from '../actions/uiActions';
import { getUser } from '../selectors/authSelectors';
import logoHeader from '../assets/LogoWithIconOrangeWithWhiteBackground.png';

const SLIDE_DATA = [
    {
        textTitle: 'Step 1',
        text:
            'Welcome! We deliver in as little as 4 minutes...wow, right?! Start by setting your delivery location.'
    },
    {
        textTitle: 'Step 2',
        text:
            'Next, fill your cart up. We carry products specifically catered to you, so let us know what you like!'
    },
    {
        textTitle: 'Step 3',
        text:
            'When ready, light a beacon! This places your order and notifies local Hasty Heroes of your order request.'
    },
    {
        textTitle: 'Step 4',
        text:
            'Look for updates and notifications from available Heroes. Communicate with them from directly within the app!'
    },
    {
        textTitle: 'Step 5',
        text: 'A Hero will arrive with your products shortly. Enjoy!'
    }
];

class WelcomeScreen extends Component {
    static navigationOptions = statusBarOnly;

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && firebaseAuth.currentUser) {
            this.props.navigation.navigate('main');
        }
    }

    logIn = () => {
        this.props.navigation.navigate('auth', { logIn: true });
    };

    signUp = () => {
        this.props.navigation.navigate('auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoHeaderWrapper}>
                    <Image style={styles.logoHeader} source={logoHeader} />
                </View>
                <Slides data={SLIDE_DATA} />
                <View style={styles.buttonWrapper}>
                    <Button
                        onPress={this.signUp}
                        title="Get Started"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.signUpButton}
                        textStyle={styles.signUpButtonText}
                    />
                    <Button
                        onPress={this.logIn}
                        title="Login"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.signInButton}
                        textStyle={styles.signInButtonText}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    logoHeaderWrapper: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoHeader: {
        width: 223,
        height: 40
    },
    buttonWrapper: {
        marginHorizontal: 20
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    signInButton: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        justifyContent: 'center',
        height: emY(3.8),
        padding: 0
    },
    signUpButton: {
        backgroundColor: Color.DEFAULT,
        borderColor: Color.DEFAULT,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        height: emY(3.8),
        padding: 0
    },
    signInButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: emY(1.5)
    },
    signUpButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: emY(1.5)
    }
});

const mapStateToProps = state => ({
    user: getUser(state)
});

const mapDispatchToProps = {
    setFirstTimeOpened
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeScreen);
