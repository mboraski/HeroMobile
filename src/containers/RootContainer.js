// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Permissions, Notifications, Updates } from 'expo';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavigator';
import CommunicationPopup from '../components/CommunicationPopup';
import DropdownAlert from '../components/DropdownAlert';
import {
    listenToAuthChanges,
    signOut,
    setUserExpoPushToken
} from '../actions/authActions';
import { closeCustomerPopup, dropdownAlert } from '../actions/uiActions';
import {
    unListenCustomerBlock,
    fetchProducts
} from '../actions/productActions';
import {
    unListenOrderStatus,
    unListenToOrderFulfillment,
    unListenOrderDelivery,
    unListenOrderError,
    listenToOrderStatus,
    listenToOrderFulfillment,
    listenToOrderError,
    checkOpenOrders
} from '../actions/orderActions';
import { getOrderId } from '../selectors/orderSelectors';

class RootContainer extends Component {
    componentWillMount() {
        this.props.listenToAuthChanges();
    }

    async componentDidMount() {
        /* Push Notification Permissions Start */
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(
                Permissions.NOTIFICATIONS
            );
            finalStatus = status;
        }
        // Temp since iOS does not ask twice.
        // const token = await Notifications.getExpoPushTokenAsync();
        // this.props.setUserExpoPushToken(token);
        if (finalStatus === 'granted') {
            const token = await Notifications.getExpoPushTokenAsync();
            this.props.setUserExpoPushToken(token);
            // this.notificationSubscription = Notifications.addListener(
            //     this.handleNotification
            // );
        }
        /* Push Notification Permissions End */
        if (!__DEV__) {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                Alert.alert('This app is out of date.', 'Update?', [
                    { text: 'Cancel' },
                    { text: 'Confirm', onPress: () => Updates.reload() }
                ]);
            }
        }

        this.props.fetchProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orderId) {
            this.props.listenToOrderFulfillment(nextProps.orderId);
            this.props.listenToOrderStatus(nextProps.orderId);
            this.props.listenToOrderError(nextProps.orderId);
        }
    }

    componentWillUnMount() {
        this.props.unListenCustomerBlock();
        this.props.unListenToOrderFulfillment();
        this.props.unListenOrderError();
        this.props.unListenOrderStatus();
        this.props.unListenOrderDelivery();
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
    container: {
        flex: 1
    }
});

const mapStateToProps = state => ({
    authExpirationDate: state.auth.expirationDate,
    customerPopupVisible: state.ui.customerPopupVisible,
    dropdownAlertVisible: state.ui.dropdownAlertVisible,
    dropdownAlertText: state.ui.dropdownAlertText,
    orderId: getOrderId(state),
    nav: state.nav
});

const mapDispatchToProps = {
    unListenCustomerBlock,
    setUserExpoPushToken,
    closeCustomerPopup,
    dropdownAlert,
    listenToAuthChanges,
    signOut,
    unListenOrderStatus,
    unListenToOrderFulfillment,
    unListenOrderError,
    unListenOrderDelivery,
    listenToOrderStatus,
    listenToOrderFulfillment,
    listenToOrderError,
    checkOpenOrders,
    fetchProducts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);
