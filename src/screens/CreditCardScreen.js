// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import RemoteSubmitTextButton from '../components/RemoteSubmitTextButton';
import { getUser } from '../selectors/authSelectors';
import { default as CreditCardFormContainer } from '../containers/CreditCardFormContainer';
import Style from '../constants/Style';

class CreditCardScreen extends Component {
    handleSubmitSuccess = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <CreditCardFormContainer
                navigation={this.props.navigation}
                onSubmitSuccess={this.handleSubmitSuccess}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: getUser(state)
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
