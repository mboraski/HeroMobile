import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Permissions, Notifications } from 'expo';

// Relative Imports
import firebase from '../firebase';
import MenuNavigator from '../navigations/MenuNavigator';
// import CommunicationPopup from '../components/CommunicationPopup';
import DropdownAlert from '../components/DropdownAlert';
import { authChanged, signOut } from '../actions/authActions';
import { closeCustomerPopup, dropdownAlert } from '../actions/uiActions';
import { reduxBoundAddListener } from '../store';

class RootContainer extends Component {
    async componentWillMount() {
        if (
            this.props.user &&
            moment().isAfter(moment(this.props.authExpirationDate))
        ) {
            this.props.signOut();
        }

        firebase.auth().onAuthStateChanged(user => {
            this.props.authChanged(user);
        });

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

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this.notificationSubscription = Notifications.addListener(
            this.handleNotification
        );

        // fetch if contractor is online
        // fire appropriate actions
    }

    componentWillUnmount() {
        firebase.database().ref('products/US/TX/Austin').off();
    }

    handleNotification = notification => {
        if (notification.data) {
            if (notification.data.type === 'feedback') {
                this.props.dispatch(
                    NavigationActions.navigate({
                        routeName: 'notificationFeedback',
                        params: notification.data
                    })
                );
            }
        }
    };

    handleCustomerPopupClose = () => {
        this.props.closeCustomerPopup();
    };

    handleDropdownAlertCloseAnimationComplete = () => {
        this.props.dropdownAlert(false);
    };

    render() {
        const {
            // customerPopupVisible,
            dropdownAlertVisible,
            dropdownAlertText
        } = this.props;
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener: reduxBoundAddListener
        });
        return (
            <View style={styles.container}>
                <MenuNavigator navigation={navigation} />
                {/* <CommunicationPopup
                    openModal={customerPopupVisible}
                    closeModal={this.handleCustomerPopupClose}
                /> */}
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
    isOpened: state.isOpened,
    customerPopupVisible: state.ui.customerPopupVisible,
    dropdownAlertVisible: state.ui.dropdownAlertVisible,
    dropdownAlertText: state.ui.dropdownAlertText,
    nav: state.nav,
    online: state.auth.online
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            closeCustomerPopup,
            dropdownAlert,
            authChanged,
            signOut
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
