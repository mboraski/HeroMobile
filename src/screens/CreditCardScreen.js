// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import RemoteSubmitTextButton from '../components/RemoteSubmitTextButton';
import { getUser } from '../selectors/authSelectors';
import { getCards } from '../selectors/paymentSelectors';
import { default as CreditCardFormContainer } from '../containers/CreditCardFormContainer';
import Style from '../constants/Style';

class CreditCardScreen extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.cards.length < this.props.cards.length) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return <CreditCardFormContainer navigation={this.props.navigation} />;
    }
}

const mapStateToProps = state => ({
    user: getUser(state),
    cards: getCards(state)
});

const mapDispatchToProps = {};

CreditCardScreen.navigationOptions = ({ navigation }) => ({
    title:
        navigation.state.params && navigation.state.params.source
            ? 'Edit Card'
            : 'Add Card',
    headerLeft: <BackButton onPress={() => navigation.pop()} />,
    headerRight: <RemoteSubmitTextButton title="Save" formName="CreditCard" />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditCardScreen);
