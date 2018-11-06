// 3rd Party Libraries
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import SignInFormContainer from '../containers/SignInFormContainer';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import { listCards } from '../actions/paymentActions';
import { getUser } from '../selectors/authSelectors';
import { getFirstTimeOpened } from '../selectors/uiSelectors';
import { emY } from '../utils/em';

import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import { statusBarOnly } from '../constants/Style';
import AuthScreenBackground from '../assets/AuthScreenBackground.jpg';
// TODO: add width then use for drawer width. Save to store.

class AuthScreen extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        signUp: false,
        openModal: false
    };

    componentDidMount() {
        // TODO: uncomment
        // const { firstTimeOpened, navigation } = this.props;
        // if (firstTimeOpened) {
        //     navigation.dispatch(reset('welcome'));
        // }
    }

    openSignUpForm = () => {
        this.setState({ signUp: true });
    };

    openSignInForm = () => {
        this.setState({
            signUp: false,
            openModal: true
        });
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    render() {
        const { navigation } = this.props;
        const signUp = this.state.signUp;
        const signUpButtonHighlighted = signUp
            ? styles.buttonHighlighted
            : null;
        const loginButtonHighlighted = !signUp
            ? styles.buttonHighlighted
            : null;
        const signUpButtonTextHighlighted = signUp
            ? styles.buttonTextHighlighted
            : null;
        const loginButtonTextHighlighted = !signUp
            ? styles.buttonTextHighlighted
            : null;

        return (
            <ScrollView style={styles.container} keyboardDismissMode="on-drag">
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="position"
                >
                    <ImageBackground
                        source={AuthScreenBackground}
                        style={styles.image}
                    >
                        <Text style={styles.imageText}>WELCOME</Text>
                    </ImageBackground>
                    <View style={styles.buttonsRow}>
                        <Button
                            title="Sign Up"
                            buttonStyle={[
                                styles.button,
                                signUpButtonHighlighted
                            ]}
                            textStyle={[
                                styles.buttonText,
                                signUpButtonTextHighlighted
                            ]}
                            onPress={this.openSignUpForm}
                        />
                        <Button
                            title="Log In"
                            buttonStyle={[
                                styles.button,
                                loginButtonHighlighted
                            ]}
                            textStyle={[
                                styles.buttonText,
                                loginButtonTextHighlighted
                            ]}
                            onPress={this.openSignInForm}
                        />
                    </View>
                    {signUp ? (
                        <SignUpFormContainer navigation={navigation} />
                    ) : (
                        <SignInFormContainer navigation={navigation} />
                    )}
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        height: Dimensions.window.height / 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 35,
        textAlign: 'center',
        letterSpacing: 5
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: emY(1)
    },
    button: {
        minWidth: 120,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_500,
        backgroundColor: '#fff',
        height: emY(3)
    },
    buttonText: {
        color: Color.GREY_500,
        fontSize: emY(1)
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_500,
        borderColor: '#fff'
    },
    buttonTextHighlighted: {
        color: '#fff'
    }
});

const mapStateToProps = state => ({
    user: getUser(state),
    firstTimeOpened: getFirstTimeOpened(state)
});

const mapDispatchToProps = {
    listCards
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthScreen);
