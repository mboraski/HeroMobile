// 3rd Party Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import stripeClient from 'stripe-client';

// Relative Imports
import {
    addCard,
    deleteCard,
    createStripeCustomerWithCard
} from '../actions/paymentActions';
import { dropdownAlert } from '../actions/uiActions';

import { getStripeCustomerId, getPending } from '../selectors/paymentSelectors';
import { getEmail } from '../selectors/authSelectors';

import TextInputField from '../components/TextInputField';
import CardNumberInputField from '../components/CardNumberInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';

import Color from '../constants/Color';
import { emY } from '../utils/em';

import formatCardNumber from '../formatting/formatCardNumber';
import formatCardExpiry from '../formatting/formatCardExpiry';
import required from '../validation/required';
import { STRIPE_CLIENT_KEY } from '../keys/Stripe';

const stripe = stripeClient(STRIPE_CLIENT_KEY);
const keyboardVerticalOffset = emY(1);

export class CreditCardFormContainer extends Component {
    deleteCardConfirm = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this card?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: this.deleteCard }
        ]);
    };

    deleteCard = () =>
        this.props.deleteCard({
            source: this.props.navigation.state.params.source.id,
            stripeCustomerId: this.props.stripeCustomerId
        });

    render() {
        const {
            pending,
            error,
            submitting,
            navigation: {
                state: { params }
            }
        } = this.props;
        const source = params && params.source;
        const card = source && source.card;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <DismissKeyboardView style={styles.container}>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <View style={styles.form}>
                        <CardNumberInputField
                            name="number"
                            label="CARD NUMBER"
                            normalize={formatCardNumber}
                            keyboardType="number-pad"
                            validate={required}
                            placeholder={
                                card ? `**** **** **** + ${card.last4}` : ''
                            }
                        />
                        <TextInputField
                            name="name"
                            label="CARDHOLDER NAME"
                            validate={required}
                        />
                        <View style={styles.formInputs}>
                            <TextInputField
                                name="exp"
                                label="EXP. DATE"
                                containerStyle={styles.expiryContainer}
                                style={styles.smallInputText}
                                normalize={formatCardExpiry}
                                keyboardType="number-pad"
                                validate={required}
                            />
                            <TextInputField
                                name="cvc"
                                label="CVC"
                                secureTextEntry
                                containerStyle={styles.cvcContainer}
                                style={styles.smallInputText}
                                keyboardType="number-pad"
                                validate={required}
                                placeholder={card ? '***' : ''}
                            />
                        </View>
                    </View>
                    {card && (
                        <Button
                            title="Delete Card"
                            onPress={this.deleteCardConfirm}
                            containerViewStyle={styles.buttonContainer}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    )}
                </DismissKeyboardView>
                {(submitting || pending) && (
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color={Color.DEFAULT} />
                    </View>
                )}
            </KeyboardAvoidingView>
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    numberContainer: {
        flex: 1
    },
    expiryContainer: {
        width: 140
    },
    smallInputText: {
        textAlign: 'center'
    },
    cvcContainer: {
        width: 110
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
    },
    error: {
        paddingHorizontal: 25,
        fontSize: emY(0.8),
        color: Color.RED_500,
        marginTop: emY(0.5)
    },
    spinner: {
        backgroundColor: Color.WHITE
    }
});

const formOptions = {
    form: 'CreditCard',
    async onSubmit(values, dispatch, props) {
        try {
            const email = props.email;
            const exp = values.exp.split('/');
            const information = {
                card: {
                    number: values.number.replace(' ', ''),
                    exp_month: Number(exp[0] || 0),
                    exp_year: Number(exp[1] || 0),
                    cvc: values.cvc,
                    name: values.name
                }
            };
            const newCard = await stripe.createToken(information);
            if (newCard.error) {
                let error;
                if (newCard.error.param) {
                    error = { _error: 'Card is invalid' };
                    if (
                        newCard.error.param === 'exp_month' ||
                        newCard.error.param === 'exp_year'
                    ) {
                        error.exp = newCard.error.message;
                    } else {
                        error[newCard.error.param] = newCard.error.message;
                    }
                } else {
                    error = { _error: newCard.error.message };
                }
                throw new SubmissionError(error);
            }
            if (props.stripeCustomerId) {
                addCard({
                    stripeCustomerId: props.stripeCustomerId,
                    token: newCard,
                    dispatch
                });
            } else {
                createStripeCustomerWithCard({
                    email,
                    token: newCard,
                    dispatch
                });
            }
        } catch (error) {
            dispatch(dropdownAlert(true, 'Error submitting credit card.'));
        }
    }
};

const mapStateToProps = (state, props) => {
    const source =
        props.navigation.state.params && props.navigation.state.params.source;
    return {
        initialValues: source
            ? {
                  exp: `${source.card.exp_month}/${source.card.exp_year}`,
                  name: source.owner.name
              }
            : {},
        pending: getPending(state),
        stripeCustomerId: getStripeCustomerId(state),
        email: getEmail(state)
    };
};

const mapDispatchToProps = {
    deleteCard
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm(formOptions)(CreditCardFormContainer));
