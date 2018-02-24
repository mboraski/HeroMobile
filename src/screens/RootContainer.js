import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';
import moment from 'moment';

// Relative Imports
import { auth } from '../firebase';
import MenuNavigator from '../navigations/MenuNavigator';
import CommunicationPopup from '../components/CommunicationPopup';
import { authChanged, signOut } from '../actions/authActions';
import { closeCustomerPopup } from '../actions/uiActions';
import { reduxBoundAddListener } from '../store';

class RootContainer extends Component {
    componentWillMount() {
        if (this.props.user && moment().isAfter(moment(this.props.authExpirationDate))) {
            this.props.signOut();
        }
        auth.onAuthStateChanged(user => {
            this.props.authChanged(user);
        });
    }

    handleCustomerPopupClose = () => {
        this.props.closeCustomerPopup();
    };

    render() {
        const { customerPopupVisible } = this.props;
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener: reduxBoundAddListener
        });
        return (
            <View style={styles.container}>
                <MenuNavigator navigation={navigation} />
                <CommunicationPopup
                    openModal={customerPopupVisible}
                    closeModal={this.handleCustomerPopupClose}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    authExpirationDate: state.auth.expirationDate,
    isOpened: state.isOpened,
    customerPopupVisible: state.ui.customerPopupVisible,
    nav: state.nav
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            closeCustomerPopup,
            authChanged,
            signOut
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
