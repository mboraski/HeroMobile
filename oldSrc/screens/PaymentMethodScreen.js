// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuAndBackButton from '../components/MenuAndBackButton';
import SectionTitle from '../components/SectionTitle';
import PaymentMethod from '../components/PaymentMethod';
import TextButton from '../components/TextButton';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { listCards } from '../actions/paymentActions';
import { emY } from '../utils/em';

class PaymentMethodScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const signedUp =
            navigation.state.params && navigation.state.params.signedUp;
        const onPressHeaderRight = () => navigation.goBack();
        return {
            title: 'Payment',
            headerLeft: signedUp ? null : (
                <MenuAndBackButton navigation={navigation} />
            ),
            headerRight: signedUp ? (
                <TextButton title="Skip" onPress={onPressHeaderRight} />
            ) : null,
            headerStyle: Style.header,
            headerTitleStyle: Style.headerTitle
        };
    };

    static defaultProps = {
        accounts: [
            {
                type: 'bank-america',
                name: 'Bank of America'
            }
        ],
        paypal: {
            email: 'johndoe@gmail.com'
        }
    };

    componentDidMount() {
        this.props.listCards(this.props.user.uid);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
        const navigationParams = nextProps.navigation.state.params || {};
        if (navigationParams.signedUp) {
            if (
                this.props.cards.length !== nextProps.cards.length &&
                nextProps.cards.length > 0
            ) {
                this.props.navigation.goBack();
            }
        }
    }

    addCard = () => {
        this.props.navigation.navigate('creditCard');
    };

    selectPaymentMethod = card => {
        this.props.navigation.navigate('creditCard', { card });
    };

    renderCard = (card, index) => {
        const onPress = () => this.selectPaymentMethod(card);
        return (
            <PaymentMethod
                key={index}
                type={card.brand}
                text={card.last4}
                onPress={onPress}
            />
        );
    };

    renderAccount = (account, index) => (
        <PaymentMethod
            key={index}
            type={account.type}
            text={account.name}
            onPress={this.selectPaymentMethod}
        />
    );

    render() {
        const { cards, accounts, paypal } = this.props;
        return (
            <ScrollView style={styles.container}>
                <SectionTitle title="MY CARDS" />
                {cards.map(this.renderCard)}
                <PaymentMethod text="Add Card" onPress={this.addCard} />
                <SectionTitle title="MY BANK ACCOUNT" />
                {accounts.map(this.renderAccount)}
                <SectionTitle title="MY PAYPAL" />
                {paypal ? (
                    <PaymentMethod
                        type="paypal"
                        text={paypal.email}
                        onPress={this.selectPaymentMethod}
                    />
                ) : null}
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
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    header: state.header,
    cards: state.payment.cards
});

const mapDispatchToProps = {
    listCards
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethodScreen);
