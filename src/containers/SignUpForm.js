import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

import { signInWithFacebook, signUp } from '../actions/authActions';
import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import LogoSpinner from '../components/LogoSpinner';
import SuccessState from '../components/SuccessState';
import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPhoneNumber from '../validation/validPhoneNumber';
import validPassword from '../validation/validPassword';
import { emY } from '../utils/em';

class SignUpForm extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.user && !this.props.user) {
            this.props.onAuthSuccess();
        }
    };

    signInWithFacebook = () => {
        this.props
            .signInWithFacebook()
            .catch(error => Alert.alert('Error', error.message));
    };

    render() {
        const {
            anyTouched,
            pending,
            submitting,
            submitSucceeded,
            asyncValidating,
            invalid,
            pristine,
            error,
            handleSubmit
        } = this.props;
        console.log('SignUpForm render error: ', error);
        const disabled =
            pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid
                ? 'Please fill out form with no errors or empty fields.'
                : 'Create Account';
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        autoCapitalize={'words'}
                        containerStyle={styles.fieldContainer}
                        name="name"
                        label="Name"
                        validate={[required]}
                    />
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                        validate={[required, validEmail]}
                    />
                    <InlineLabelTextInputField
                        containerStyle={styles.fieldContainer}
                        name="number"
                        label="Phone Number"
                        keyboardType="phone-pad"
                        validate={[required, validPhoneNumber]}
                    />
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="password"
                        label="Password"
                        secureTextEntry
                        validate={[required, validPassword]}
                    />
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="confirmPassword"
                        label="Confirm Password"
                        secureTextEntry
                        validate={[required, validPassword]}
                    />
                    {submitting ? (
                        <LogoSpinner
                            style={[StyleSheet.absoluteFill, styles.spinner]}
                        />
                    ) : null}
                    {submitSucceeded ? (
                        <SuccessState
                            style={StyleSheet.absoluteFill}
                            onAnimationEnd={this.props.onAuthSuccess}
                        />
                    ) : null}
                </View>
                {error && <Text style={styles.signUpError}>{error}</Text>}
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                        styles.button,
                        styles.buttonMargin,
                        !anyTouched && invalid && styles.buttonDisabled,
                        anyTouched && invalid && styles.buttonInvalid
                    ]}
                    disabled={disabled}
                >
                    <Text style={styles.buttonText}>{submitText}</Text>
                </TouchableOpacity>
                <Button
                    onPress={this.signInWithFacebook}
                    title="Sign Up with Facebook"
                    icon={{
                        type: 'material-community',
                        name: 'facebook-box',
                        color: '#fff',
                        size: 25
                    }}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15
    },
    formInputs: {
        paddingHorizontal: 15,
        paddingBottom: emY(1.5)
    },
    fieldContainer: {
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    button: {
        backgroundColor: '#000',
        marginHorizontal: 25,
        justifyContent: 'center',
        height: emY(3)
    },
    buttonDisabled: {
        backgroundColor: Color.GREY_500
    },
    buttonInvalid: {
        backgroundColor: Color.RED_500
    },
    buttonIcon: {
        marginRight: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: emY(0.9)
    },
    buttonMargin: {
        marginBottom: 10
    },
    spinner: {
        backgroundColor: Color.WHITE
    },
    signUpError: {
        color: Color.RED_500,
        textAlign: 'center',
        fontSize: emY(0.9),
        paddingHorizontal: 15,
        paddingBottom: emY(1.5)
    }
});

const formOptions = {
    form: 'SignUp',
    validate(values) {
        const errors = {};
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        } else if (
            !values.name ||
            !values.email ||
            !values.number ||
            !values.password ||
            !values.confirmPassword
        ) {
            errors.missingValues = 'Some form field values are missing';
        }
        console.log('validate errors: ', errors);
        return errors;
    },
    onSubmit(values, dispatch, props) {
        return props.signInWithEmailAndPassword(values).catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
    },
    onSubmitFail(errors, dispatch, submitError, props) {
        console.log('onSubmitFail errors: ', errors);
        console.log('onSubmitFail submitError: ', submitError);
        console.log('onSubmitFail props: ', props);
    }
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });

const mapDispatchToProps = {
    signInWithFacebook,
    signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm(formOptions)(SignUpForm)
);
