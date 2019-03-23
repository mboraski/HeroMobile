import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { signInWithEmailAndPassword } from '../actions/authActions';
import { getUser } from '../selectors/authSelectors';

import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import SuccessState from '../components/SuccessState';
import Text from '../components/Text';

import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPassword from '../validation/validPassword';

import { emY } from '../utils/em';
import { formatError } from '../utils/errors';

class SignInFormContainer extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.user && !this.props.user) {
            this.props.navigation.navigate('main');
        }
    };

    render() {
        // TODO: Show correctly login failure notice. Part of store.
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
        const disabled =
            pending || submitting || asyncValidating || invalid || pristine;
        const submitText = 'Log In';
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                        validate={[required, validEmail]}
                    />
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="password"
                        label="Password"
                        secureTextEntry
                        validate={[required, validPassword]}
                    />
                    {submitting ? (
                        <ActivityIndicator size="large" color={Color.DEFAULT} />
                    ) : null}
                    {submitSucceeded ? (
                        <SuccessState
                            style={[StyleSheet.absoluteFill]}
                            onAnimationEnd={this.props.onAuthSuccess}
                        />
                    ) : null}
                </View>
                {error && (
                    <Text style={styles.signUpError}>{formatError(error)}</Text>
                )}
                <TouchableOpacity
                    onPress={handleSubmit(signInWithEmailAndPassword)}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    authState: {
        paddingBottom: emY(2)
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 15
    },
    formInputs: {
        marginBottom: emY(2.0),
        marginTop: emY(1.7)
    },
    fieldContainer: {
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    button: {
        borderRadius: 5,
        backgroundColor: Color.DEFAULT,
        justifyContent: 'center',
        height: emY(3)
    },
    buttonDisabled: {
        backgroundColor: Color.GREY_500
    },
    buttonInvalid: {
        backgroundColor: Color.RED_500
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
        paddingBottom: emY(1.5)
    }
});

const formOptions = {
    form: 'SignIn',
    validate(values) {
        const errors = {};
        if (!values.email || !values.password) {
            errors.missingValues = 'Some form field values are missing';
        }
        return errors;
    }
};

const mapStateToProps = state => ({
    user: getUser(state)
});

export default connect(
    mapStateToProps,
    {}
)(reduxForm(formOptions)(SignInFormContainer));
