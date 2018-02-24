// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { reduxForm } from 'redux-form';

// Relative Imports
import BackButton from '../components/BackButton';
import TextButton from '../components/TextButton';
import TextInputField from '../components/TextInputField';
import CardNumberInputField from '../components/CardNumberInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import formatCardNumber from '../formatting/formatCardNumber';
import formatCardExpiry from '../formatting/formatCardExpiry';

class CreditCardScreen extends Component {
    render() {
        return (
            <DismissKeyboardView style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.formInputs}>
                        <CardNumberInputField
                            name="number"
                            label="CARD NUMBER"
                            containerStyle={styles.numberContainer}
                            normalize={formatCardNumber}
                            keyboardType="number-pad"
                        />
                        <TextInputField
                            name="exp"
                            label="EXP. DATE"
                            containerStyle={styles.expiryContainer}
                            style={styles.expiry}
                            normalize={formatCardExpiry}
                            keyboardType="number-pad"
                        />
                    </View>
                    <TextInputField name="name" label="CARDHOLDER NAME" />
                    <TextInputField
                        name="cvc"
                        label="CVC"
                        secureTextEntry
                        containerStyle={styles.cvcContainer}
                        keyboardType="number-pad"
                    />
                </View>
                <Button
                    title="Delete Card"
                    onPress={this.onButtonPress}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </DismissKeyboardView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    form: {
        flex: 1
    },
    formInputs: {
        flexDirection: 'row'
    },
    numberContainer: {
        flex: 1
    },
    expiryContainer: {
        width: 120
    },
    expiry: {
        textAlign: 'center'
    },
    cvcContainer: {
        width: 120
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: emY(20 / 16),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_300
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: emY(22 / 15),
        paddingVertical: emY(15 / 16),
        justifyContent: 'flex-start'
    },
    buttonText: {
        color: '#000',
        fontSize: emY(1)
    }
});

CreditCardScreen = reduxForm({
    form: 'CreditCard'
})(CreditCardScreen);

CreditCardScreen.navigationOptions = ({ navigation }) => ({
    title: 'Edit Card',
    headerLeft: <BackButton onPress={() => navigation.goBack()} />,
    headerRight: <TextButton title="Save" />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle,
});

export default CreditCardScreen;
