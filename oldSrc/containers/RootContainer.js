// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavigator';
import CommunicationPopup from '../components/CommunicationPopup';
import DropdownAlert from '../components/DropdownAlert';
import { listenToAuthChanges, signOut } from '../actions/authActions';
import { closeCustomerPopup, dropdownAlert } from '../actions/uiActions';
import { unListenProductsRef } from '../actions/productActions';
// import { reduxBoundAddListener } from '../store';

class RootContainer extends Component {
    componentWillMount() {
        this.props.listenToAuthChanges();

        // if (
        //     this.props.user || firebaseAuth.currentUser &&
        //     moment().isAfter(moment(this.props.authExpirationDate))
        // ) {
        //     console.log('current moment: ', moment().toDate());
        //     this.props.signOut();
        // }
    }

    componentWillUnMount() {
        // this.props.unListenCustomerBlock();
        // this.props.unListenToOrderFulfillment(this.props.orderId);
        // this.props.unListenOrderError(this.props.orderId);
        // this.props.unListenOrderStatus(this.props.orderId);
    }

    handleCustomerPopupClose = () => {
        this.props.closeCustomerPopup();
    };

    handleDropdownAlertCloseAnimationComplete = () => {
        this.props.dropdownAlert(false);
    };

    render() {
        const {
            customerPopupVisible,
            dropdownAlertVisible,
            dropdownAlertText
        } = this.props;
        // const navigation = addNavigationHelpers({
        //     dispatch,
        //     state: nav
        //     // addListener: reduxBoundAddListener
        // });
        return (
            <View style={styles.container}>
                <MenuNavigator />
                <CommunicationPopup
                    openModal={customerPopupVisible}
                    closeModal={this.handleCustomerPopupClose}
                />
                <DropdownAlert
                    visible={dropdownAlertVisible}
                    text={dropdownAlertText}
                    onCloseAnimationComplete={
                        this.handleDropdownAlertCloseAnimationComplete
                    }
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
    customerPopupVisible: state.ui.customerPopupVisible,
    dropdownAlertVisible: state.ui.dropdownAlertVisible,
    dropdownAlertText: state.ui.dropdownAlertText,
    nav: state.nav
});

const mapDispatchToProps = {
    unListenProductsRef,
    closeCustomerPopup,
    dropdownAlert,
    listenToAuthChanges,
    signOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);
