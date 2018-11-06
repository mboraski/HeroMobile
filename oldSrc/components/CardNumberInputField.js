import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';
import valid from 'card-validator';

import { styles as baseStyles } from './TextInputField';
import CardImage from './CardImage';
import formatCardNumber from '../formatting/formatCardNumber';

const renderInput = ({
    input: { onChange, ...restInput },
    meta: { touched, invalid, error },
    label,
    containerStyle,
    labelStyle,
    errorStyle,
    style,
    editable = true,
    ...props
}) => {
    const { card } = valid.number(restInput.value);
    return (
        <View style={[baseStyles.formInputGroup, containerStyle]}>
            {label ? (
                <Text
                    style={[
                        baseStyles.label,
                        labelStyle,
                        touched && invalid && baseStyles.labelInvalid
                    ]}
                >
                    {label}
                </Text>
            ) : null}
            <View
                style={[
                    baseStyles.textInputContainer,
                    styles.textInputContainer
                ]}
            >
                {card ? (
                    <CardImage type={card.type} style={styles.card} />
                ) : null}
                <TextInput
                    style={[
                        baseStyles.textInput,
                        styles.textInput,
                        !editable && baseStyles.textInputNotEditable,
                        touched && invalid && baseStyles.textInputInvalid,
                        style
                    ]}
                    editable={editable}
                    onChangeText={onChange}
                    normalize={formatCardNumber}
                    keyboardType="number-pad"
                    {...restInput}
                    {...props}
                />
            </View>
            {touched && error ? (
                <Text style={[baseStyles.error, errorStyle]}>{error}</Text>
            ) : null}
        </View>
    );
};

const CardNumberInputField = ({ ...props }) => (
    <Field component={renderInput} {...props} />
);

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row'
    },
    textInput: {
        flex: 1
    },
    card: {
        alignSelf: 'center',
        width: 50,
        height: 20,
        marginLeft: 10
    }
});

export default CardNumberInputField;
