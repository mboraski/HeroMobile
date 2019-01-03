import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { database } from 'firebase'; //TODO: fix this

import Color from '../constants/Color';

import TextInputField from '../components/TextInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';

import required from '../validation/required';
import maxLength from '../validation/maxLength';
import { emY } from '../utils/em';

const maxLength500 = maxLength(500);

export class NotificationFeedbackFormContainer extends Component {
    state = {};
    render() {
        const {
            submit,
            anyTouched,
            pending,
            submitting,
            asyncValidating,
            invalid,
            pristine,
            error,
            description
        } = this.props;
        const disabled =
            pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid
                ? 'Please fix issues before continuing'
                : 'DONE';
        return (
            <DismissKeyboardView style={styles.container}>
                <Text style={styles.title}>{description}</Text>
                <Text style={styles.subtitle}>500 character limit</Text>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.formInputs}>
                    <TextInputField
                        name="feedbackMessage"
                        label="MESSAGE"
                        multiline
                        validate={[required, maxLength500]}
                        containerStyle={styles.textInputContainer}
                        labelStyle={styles.label}
                        style={styles.textInput}
                    />
                </View>
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
        marginBottom: emY(0.5)
    },
    subtitle: {
        fontSize: emY(1),
        textAlign: 'center',
        fontStyle: 'italic',
        color: Color.GREY_500
    },
    error: {
        color: Color.RED_500,
        textAlign: 'center',
        fontSize: emY(0.9),
        paddingHorizontal: 15,
        paddingBottom: emY(1.5)
    },
    formInputs: {
        flex: 1
    },
    textInputContainer: {
        flex: 1
    },
    textInput: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_500,
        textAlignVertical: 'top'
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
    }
});

const formOptions = {
    form: 'Notification',
    onSubmit({ feedbackMessage }, dispatch, props) {
        return database
            .ref(`userFeedback/sxsw/${props.formKey}`)
            .push({ feedbackMessage })
            .catch(error => {
                throw new SubmissionError({ _error: error.message });
            });
    },
    onSubmitSuccess(values, dispatch, props) {
        props.navigation.goBack();
    }
};

export default connect(
    null,
    null
)(reduxForm(formOptions)(NotificationFeedbackFormContainer));
