import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { setDeliveryNotes } from '../actions/checkoutActions';
import Color from '../constants/Color';
import TextInputField from '../components/TextInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import required from '../validation/required';
import maxLength from '../validation/maxLength';
import { emY } from '../utils/em';

const maxLength500 = maxLength(500);

class DeliveryNotesForm extends Component {
    render() {
        const {
            submit,
            anyTouched,
            pending,
            submitting,
            asyncValidating,
            invalid,
            pristine
        } = this.props;
        const disabled =
            pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid
                ? 'Please fix issues before continuing'
                : 'DONE';
        return (
            <DismissKeyboardView style={styles.container}>
                <Text style={styles.title}>
                    What would you like to tell your Hero?
                </Text>
                <Text style={styles.subtitle}>500 character limit</Text>
                <View style={styles.formInputs}>
                    <TextInputField
                        name="notes"
                        label="NOTES"
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
    form: 'DeliveryNotes',
    onSubmit(values, dispatch, props) {
        props.setDeliveryNotes(values.notes);
        props.navigation.goBack();
    }
};

const mapStateToProps = state => ({
    initialValues: {
        notes: state.checkout.notes
    }
});

const mapDispatchToProps = {
    setDeliveryNotes
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm(formOptions)(DeliveryNotesForm));
