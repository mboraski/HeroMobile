import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';

import Color from '../constants/Color';
import { emY } from '../utils/em';

export const TextInputComponent = ({
    input: { onChange, ...restInput },
    meta: { touched, invalid, error },
    label,
    containerStyle,
    labelStyle,
    style,
    ...props
}) => (
    <View style={[styles.formInputGroup, containerStyle]}>
        {label ? (
            <Text style={[styles.label, labelStyle, touched && invalid && styles.labelInvalid]}>
                {label}
            </Text>
        ) : null}
        <TextInput
            style={[styles.textInput, style, touched && invalid && styles.textInputInvalid]}
            onChangeText={onChange}
            {...restInput}
            {...props}
        />
        {touched && error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
);

const TextInputField = props => <Field {...props} component={TextInputComponent} />;

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
        height: emY(3.125),
        paddingHorizontal: 20
    },
    textInputInvalid: {
        color: Color.RED_500,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.RED_500
    },
    error: {
        marginTop: -1 * emY(0.5),
        paddingHorizontal: 25,
        fontSize: emY(0.8),
        color: Color.RED_500,
        marginBottom: emY(0.5)
    }
});

export default TextInputField;
