// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

// Relative Imports
import MenuAndBackButton from '../components/MenuAndBackButton';
import TransparentButton from '../components/TransparentButton';
import Text from '../components/Text';
import SectionTitle from '../components/SectionTitle';
import PaymentMethod from '../components/PaymentMethod';
import TextButton from '../components/TextButton';

import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

import { getUserReadable } from '../actions/authActions';

import {
    getCards,
    getStripeCustomerId,
    getPending
} from '../selectors/paymentSelectors';
import { getSignUpAddPaymentMethodText } from '../selectors/marketingSelectors';

class PaymentMethodScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const signedUp = navigation.getParam('signedUp', false);
        const onPressHeaderRight = () => navigation.goBack();
        return {
            title: 'Payment Method',
            headerLeft: signedUp ? (
                <TransparentButton />
            ) : (
                <MenuAndBackButton navigation={navigation} />
            ),
            headerRight: signedUp ? (
                <TextButton title="Next" onPress={onPressHeaderRight} />
            ) : (
                <TransparentButton />
            ),
            headerStyle: Style.header,
            headerTitleStyle: Style.headerTitle
        };
    };

    componentDidMount() {
        this.props.getUserReadable();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.cards && nextProps.cards) {
            this.props.navigation.navigate('map');
        }
    }

    addCard = () => {
        this.props.navigation.navigate('creditCard');
    };

    selectPaymentMethod = source => {
        this.props.navigation.navigate('creditCard', { source });
    };

    renderSignUpPaymentMethodText = signedUp => {
        if (signedUp) {
            return (
                <Text style={styles.signUpAddPaymentMethodText}>
                    {this.props.signUpAddPaymentMethodText}
                </Text>
            );
        }
    };

    renderCard = (source, index) => {
        if (source && source.card) {
            const onPress = () => this.selectPaymentMethod(source);
            return (
                <PaymentMethod
                    key={index}
                    type={source.card.brand}
                    brand={source.card.brand}
                    last4={source.card.last4}
                    onPress={onPress}
                />
            );
        }
    };

    render() {
        const { cards, navigation, pending } = this.props;
        const signedUp = navigation.getParam('signedUp', false);
        return (
            <ScrollView style={styles.container}>
                {this.renderSignUpPaymentMethodText(signedUp)}
                <SectionTitle title="MY CARDS" />
                {!signedUp && cards.map(this.renderCard)}
                {pending && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            animating={pending}
                            size="large"
                            color="#f5a623"
                        />
                    </View>
                )}
                <Button
                    title="Add Card"
                    buttonStyle={[styles.button]}
                    textStyle={[styles.buttonText]}
                    onPress={this.addCard}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    formSection: {
        fontSize: emY(0.8125),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(2.1875),
        paddingBottom: emY(1)
    },
    signUpAddPaymentMethodText: {
        fontFamily: 'goodtimes'
    },
    activityIndicator: {
        marginVertical: 15
    },
    button: {
        marginTop: 20,
        minWidth: 120,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.DEFAULT,
        backgroundColor: Color.DEFAULT,
        height: emY(3),
        padding: 0
    },
    buttonText: {
        color: '#fff',
        fontSize: emY(1)
    }
});

const mapStateToProps = state => ({
    stripeCustomerId: getStripeCustomerId(state),
    cards: getCards(state),
    signUpAddPaymentMethodText: getSignUpAddPaymentMethodText(state),
    pending: getPending(state)
});

const mapDispatchToProps = {
    getUserReadable
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethodScreen);
