import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { reset } from '../actions/navigationActions';
import Color from '../constants/Color';
import TextInputField from '../components/TextInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import LogoSpinner from '../components/LogoSpinner';
import SuccessState from '../components/SuccessState';
import required from '../validation/required';
import validEmail from '../validation/validEmail';
import minLength from '../validation/minLength';
import { emY } from '../utils/em';

const minLength3 = minLength(3);

export class FeedbackForm extends Component {
    render() {
        const {
            submit,
            anyTouched,
            pending,
            submitting,
            submitSucceeded,
            asyncValidating,
            invalid,
            pristine
        } = this.props;
        const disabled =
            pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid
                ? 'Please fix issues before continuing'
                : 'SEND';
        return (
            <DismissKeyboardView style={styles.container}>
                <Text style={styles.title}>
                    We love feedback. Please help us understand your rating in
                    more detail:
                </Text>
                <View style={styles.formInputs}>
                    <TextInputField
                        name="name"
                        placeholder="Name"
                        validate={[required, minLength3]}
                        containerStyle={styles.textInputContainer}
                        style={styles.textInput}
                    />
                    <TextInputField
                        name="email"
                        placeholder="Email"
                        keyboardType="email-address"
                        validate={[required, validEmail]}
                        containerStyle={styles.textInputContainer}
                        style={styles.textInput}
                        error
                    />
                    <TextInputField
                        name="message"
                        label="MESSAGE"
                        multiline
                        validate={[required, minLength3]}
                        containerStyle={styles.textInputContainerMessage}
                        labelStyle={styles.label}
                        style={[styles.textInput, styles.textInputMessage]}
                    />
                </View>
                {submitting ? (
                    <LogoSpinner
                        style={[StyleSheet.absoluteFill, styles.spinner]}
                    />
                ) : null}
                {!submitting && submitSucceeded ? (
                    <SuccessState
                        style={StyleSheet.absoluteFill}
                        onAnimationEnd={this.props.onSubmitSucceeded}
                    />
                ) : null}
                <TouchableOpacity
                    onPress={submit}
                    style={[
                        styles.button,
                        styles.buttonMargin,
                        disabled && styles.buttonDisabled,
                        anyTouched && invalid && styles.buttonInvalid
                    ]}
                    disabled={disabled}
                >
                    <Text style={styles.buttonText}>{submitText}</Text>
                </TouchableOpacity>
            </DismissKeyboardView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: emY(1)
    },
    title: {
        fontSize: emY(1),
        textAlign: 'center',
        paddingHorizontal: 10,
        marginBottom: emY(1)
    },
    formInputs: {
        flex: 1
    },
    textInputContainer: {
        marginBottom: emY(1)
    },
    textInputContainerMessage: {
        flex: 1
    },
    textInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_500
    },
    textInputMessage: {
        flex: 1
    },
    label: {
        fontSize: emY(1),
        letterSpacing: 2,
        color: Color.GREY_500,
        paddingTop: emY(1)
    },
    button: {
        backgroundColor: '#000',
        marginHorizontal: 15,
        justifyContent: 'center',
        height: emY(3),
        marginBottom: emY(1)
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
        fontSize: emY(1)
    },
    spinner: {
        backgroundColor: Color.WHITE
    }
});

const formOptions = {
    form: 'Feedback',
    async onSubmit() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
};

const mapStateToProps = ({ auth }) => ({ token: auth.token });

const mapDispatchToProps = {};

export default reduxForm(formOptions)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FeedbackForm)
);
