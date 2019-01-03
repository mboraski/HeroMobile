import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { Field } from 'redux-form';

import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';

export const TextInputComponent = ({
    input: { onChange, ...restInput },
    meta: { touched, invalid, error },
    label,
    containerStyle,
    labelStyle,
    errorStyle,
    style,
    editable = true,
    ...props
}) => (
    <View style={[styles.formInputGroup, containerStyle]}>
        {label ? (
            <Text
                style={[
                    styles.label,
                    labelStyle,
                    touched && invalid && styles.labelInvalid
                ]}
            >
                {label}
            </Text>
        ) : null}
        <TextInput
            style={[
                styles.textInput,
                style,
                !editable && styles.textInputNotEditable,
                touched && invalid && styles.textInputInvalid
            ]}
            editable={editable}
            onChangeText={onChange}
            underlineColorAndroid="transparent"
            {...restInput}
            {...props}
        />
        {touched && error ? (
            <Text style={[styles.error, errorStyle]}>{error}</Text>
        ) : null}
    </View>
);

const TextInputField = props => (
    <Field {...props} component={TextInputComponent} />
);

export const styles = StyleSheet.create({
    formInputGroup: {
        marginBottom: emY(0.5)
    },
    label: {
        fontSize: emY(0.8125),
        paddingHorizontal: 25,
        paddingTop: emY(1.9),
        paddingBottom: emY(0.8)
    },
    labelInvalid: {
        color: Color.RED_500
    },
    textInput: {
        backgroundColor: Color.GREY_100,
        borderRadius: 7,
        marginHorizontal: 15,
        fontSize: emY(1),
        fontFamily: 'Arial',
        height: emY(3.125),
        paddingHorizontal: 20,
        ...Platform.select({
            android: {
                paddingVertical: emY(0.5)
            }
        })
    },
    textInputInvalid: {
        color: Color.RED_500,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.RED_500
    },
    textInputNotEditable: {
        color: Color.GREY_400
    },
    error: {
        paddingHorizontal: 25,
        fontSize: emY(0.8),
        color: Color.RED_500,
        marginTop: emY(0.5)
    }
});

export default TextInputField;
