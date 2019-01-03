import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { createUserWithEmailAndPassword } from '../actions/authActions';

import { getUser } from '../selectors/authSelectors';

import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import SuccessState from '../components/SuccessState';
import Text from '../components/Text';

import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPhoneNumber from '../validation/validPhoneNumber';
import validPassword from '../validation/validPassword';

import Color from '../constants/Color';
import { emY } from '../utils/em';

class SignUpFormContainer extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.user && !this.props.user) {
            this.props.navigation.navigate('paymentMethod', { signedUp: true });
        }
    };

    linkToWebsitePrivacy = () => {
        Linking.openURL(`https://hasty.app/privacy.html`);
    };

    linkToWebsiteTerms = () => {
        Linking.openURL(`https://hasty.app/terms.html`);
    };

    render() {
        const {
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
        const submitText = 'Create Account';
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        autoCapitalize={'words'}
                        containerStyle={styles.fieldContainer}
                        name="firstName"
                        label="First Name"
                        validate={[required]}
                    />
                    <InlineLabelTextInputField
                        autoCapitalize={'words'}
                        containerStyle={styles.fieldContainer}
                        name="lastName"
                        label="Last Name"
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
                        name="phoneNumber"
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
                        <ActivityIndicator
                            size="large"
                            color={Color.ORANGE_500}
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
                <Text style={styles.termsAndPrivacy}>
                    {`By using the app or creating an account you agree to be bound by Hasty's `}
                    <Text
                        onPress={this.linkToWebsiteTerms}
                        style={styles.termsAndPrivacyLink}
                    >
                        {'Terms and Conditions'}
                    </Text>
                    {' and '}
                    <Text
                        onPress={this.linkToWebsitePrivacy}
                        style={styles.termsAndPrivacyLink}
                    >
                        {'Privacy Policy'}
                    </Text>
                </Text>
                <TouchableOpacity
                    onPress={handleSubmit(createUserWithEmailAndPassword)}
                    style={[
                        styles.button,
                        styles.buttonMargin,
                        invalid && styles.buttonDisabled
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
    container: {
        flex: 1,
        marginBottom: 15
    },
    termsAndPrivacy: {
        flex: 1,
        marginBottom: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: emY(0.8)
    },
    termsAndPrivacyLink: {
        color: Color.BLUE_500
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
            !values.firstName ||
            !values.lastName ||
            !values.email ||
            !values.number ||
            !values.password ||
            !values.confirmPassword
        ) {
            errors.missingValues = 'Some form field values are missing';
        }
        return errors;
    }
};

const mapStateToProps = state => ({ user: getUser(state) });

export default connect(
    mapStateToProps,
    {}
)(reduxForm(formOptions)(SignUpFormContainer));
