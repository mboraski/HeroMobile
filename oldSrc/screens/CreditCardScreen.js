// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { listCards } from '../actions/paymentActions';
import BackButton from '../components/BackButton';
import RemoteSubmitTextButton from '../components/RemoteSubmitTextButton';
import CreditCardForm from '../containers/CreditCardForm';
import Style from '../constants/Style';

class CreditCardScreen extends Component {
    handleSubmitSuccess = () => {
        this.props.listCards(this.props.user.uid);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <CreditCardForm
                navigation={this.props.navigation}
                onSubmitSuccess={this.handleSubmitSuccess}
            />
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = {
    listCards
};

CreditCardScreen.navigationOptions = ({ navigation }) => ({
    title:
        navigation.state.params && navigation.state.params.card
            ? 'Edit Card'
            : 'Add Card',
    headerLeft: <BackButton onPress={() => navigation.goBack()} />,
    headerRight: <RemoteSubmitTextButton title="Save" formName="CreditCard" />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCardScreen);
