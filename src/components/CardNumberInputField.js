import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';
import valid from 'card-validator';

import { styles as baseStyles } from './TextInputField';
import CardImage from './CardImage';
import formatCardNumber from '../formatting/formatCardNumber';

const renderInput = ({ input: { onChange, ...restInput }, style, ...props }) => {
    const { card } = valid.number(restInput.value);
    return (
        <View style={[baseStyles.textInputContainer, styles.textInputContainer]}>
            {card ? <CardImage type={card.type} style={styles.card} /> : null}
            <TextInput
                style={[baseStyles.textInput, styles.textInput, style]}
                onChangeText={onChange}
                normalize={formatCardNumber}
                keyboardType="number-pad"
                {...restInput}
                {...props}
            />
        </View>
    );
};

const CardNumberInputField = ({ label, containerStyle, labelStyle, ...props }) => (
    <View style={[baseStyles.formInputGroup, containerStyle]}>
        <Text style={[baseStyles.label, labelStyle]}>{label}</Text>
        <Field component={renderInput} {...props} />
    </View>
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
