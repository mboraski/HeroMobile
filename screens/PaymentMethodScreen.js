// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuAndBackButton from '../components/MenuAndBackButton';
import SectionTitle from '../components/SectionTitle';
import PaymentMethod from '../components/PaymentMethod';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

class PaymentMethodScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Payment',
        headerLeft: <MenuAndBackButton navigation={navigation} />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    });

    static defaultProps = {
        cards: [
            {
                type: 'visa',
                number: '4000400040004000'
            }
        ],
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

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
    }

    addCard = () => {
        this.props.navigation.navigate('creditCard');
    };

    selectPaymentMethod = () => {
        this.props.navigation.navigate('creditCard');
    };

    renderCard = (card, index) => (
        <PaymentMethod
            key={index}
            type={card.type}
            text={card.number}
            onPress={this.selectPaymentMethod}
        />
    );

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
    header: state.header
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen);
