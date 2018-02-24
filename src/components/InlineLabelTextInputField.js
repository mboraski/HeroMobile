import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';

import Color from '../constants/Color';
import { emY } from '../utils/em';

export const InlineLabelTextInput = ({
    input: { onChange, ...restInput },
    meta: { touched, invalid, error },
    label,
    containerStyle,
    labelStyle,
    inputContainerStyle,
    style,
    ...props
}) => (
    <View style={[styles.container, containerStyle]}>
        <View style={styles.formInputGroup}>
            <Text style={[styles.label, labelStyle, touched && invalid && styles.labelInvalid]}>
                {label}
            </Text>
            <View style={[styles.textInputContainer, inputContainerStyle]}>
                <TextInput
                    style={[styles.textInput, style, touched && invalid && styles.textInputInvalid]}
                    onChangeText={onChange}
                    {...restInput}
                    {...props}
                />
            </View>
        </View>
        {touched && error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
);

const InlineLabelTextInputField = ({ textInputName, ...props }) => (
    <Field name={textInputName} component={InlineLabelTextInput} {...props} />
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.GREY_100
    },
    formInputGroup: {
        paddingHorizontal: 15,
        borderColor: Color.GREY_300,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    label: {
        color: '#000',
        fontSize: emY(1),
        paddingVertical: emY(0.875),
        marginRight: 15
    },
    labelInvalid: {
        color: Color.RED_500
    },
    textInputContainer: {
        flex: 1
    },
    textInput: {
        flex: 1,
        fontSize: emY(1),
        textAlign: 'right'
    },
    textInputInvalid: {
        color: Color.RED_500
    },
    error: {
        paddingHorizontal: 15,
        fontSize: emY(0.8),
        color: Color.RED_500,
        marginBottom: 10
    }
});

export default InlineLabelTextInputField;
