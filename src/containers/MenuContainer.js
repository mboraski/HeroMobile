import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { firebaseAuth } from '../../firebase';

// Relative Imports
import { emY } from '../utils/em';
import Color from '../constants/Color';
import MenuItem from '../components/MenuItem';
import Text from '../components/Text';
import ToggleBackButton from '../components/ToggleBackButton';

import heroIcon from '../assets/icons/logo-orange.png';
import notificationIcon from '../assets/icons/notification.png';
import cartIcon from '../assets/icons/cart.png';
import infoIcon from '../assets/icons/info.png';
import paymentIcon from '../assets/icons/payment.png';
import historyIcon from '../assets/icons/history.png';
import locationIcon from '../assets/icons/location.png';
// import profileImagePlaceholder from '../assets/profileImagePlaceholder';

import { openCustomerPopup } from '../actions/uiActions';
import { signOut } from '../actions/authActions';

import { getUserReadable } from '../selectors/authSelectors';
import { getOrderId } from '../selectors/orderSelectors';

const IMAGE_CONTAINER_SIZE = 100;

const getRoute = (items, routeName) =>
    items.find(item => item.key === routeName);

class MenuContent extends Component {
    orderPress = () => {
        if (firebaseAuth.currentUser) {
            this.props.navigation.navigate('deliveryStatus');
        }
    };

    checkoutPress = () => {
        if (firebaseAuth.currentUser && !this.props.orderId) {
            this.props.navigation.navigate('checkout');
        }
    };

    productsPress = () => {
        if (firebaseAuth.currentUser) {
            this.props.navigation.navigate('products');
        }
    };

    mapPress = () => {
        if (firebaseAuth.currentUser) {
            this.props.navigation.navigate('map');
        }
    };

    paymentMethod = () => {
        if (firebaseAuth.currentUser) {
            this.props.navigation.navigate('paymentMethod');
        }
    };

    feedbackPress = () => {
        if (firebaseAuth.currentUser) {
            this.props.navigation.navigate('openFeedback');
        }
    };

    signOut = () => {
        if (firebaseAuth.currentUser) {
            this.props.signOut();
            this.props.navigation.closeDrawer();
            this.props.navigation.navigate('welcome');
        }
    };

    render() {
        const { items, activeItemKey, userReadable } = this.props;
        return (
            <View style={styles.container}>
                {!!userReadable && (
                    <View style={styles.profile}>
                        {!!userReadable.photoUrl && (
                            <Image
                                source={{ uri: userReadable.photoUrl }}
                                style={styles.image}
                            />
                        )}
                        <Text style={styles.name}>
                            {userReadable.firstName} {userReadable.lastName}
                        </Text>
                    </View>
                )}
                <ScrollView style={styles.menuItems}>
                    {/*<MenuItem
                        route={getRoute(items, 'map')}
                        activeItemKey={activeItemKey}
                        onPress={this.mapPress}
                        image={heroIcon}
                        title="Become a Hero!"
                    /> */}
                    <MenuItem
                        route={getRoute(items, 'map')}
                        activeItemKey={activeItemKey}
                        onPress={this.mapPress}
                        image={locationIcon}
                        title="Map"
                    />
                    <MenuItem
                        route={getRoute(items, 'products')}
                        activeItemKey={activeItemKey}
                        onPress={this.productsPress}
                        image={historyIcon}
                        title="Products"
                    />
                    <MenuItem
                        route={getRoute(items, 'checkout')}
                        activeItemKey={activeItemKey}
                        onPress={this.checkoutPress}
                        image={cartIcon}
                        title="Cart / Checkout"
                    />
                    <MenuItem
                        route={getRoute(items, 'order')}
                        activeItemKey={activeItemKey}
                        onPress={this.orderPress}
                        image={notificationIcon}
                        title="Order Details"
                    />
                    <MenuItem
                        route={getRoute(items, 'paymentMethod')}
                        activeItemKey={activeItemKey}
                        onPress={this.paymentMethod}
                        image={paymentIcon}
                        title="Payment Methods"
                    />
                    <MenuItem
                        route={getRoute(items, 'openFeedback')}
                        activeItemKey={activeItemKey}
                        onPress={this.feedbackPress}
                        image={infoIcon}
                        title="Help & Feedback"
                    />
                    {/*}<MenuItem
                        route={getRoute(items, 'Feedback')}
                        activeItemKey={activeItemKey}
                        onPress={this.paymentMethod}
                        image={paymentIcon}
                        title="Customer Support"
                    /> */}
                    {/* <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={historyIcon}
                        title="History"
                    /> */}
                    {/*<MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={favoriteIcon}
                        title="Favorites & Recommended"
                    /> */}
                    {/*<MenuItem
                        route={getRoute(items, 'promotionShare')}
                        activeItemKey={activeItemKey}
                        onPress={this.promotionSharePress}
                        image={promotionIcon}
                        title="Promotions"
                    />*/}
                    {/* <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={this.handleHelpPress}
                        image={helpIcon}
                        title="Help"
                    /> */}
                    <MenuItem
                        onPress={this.signOut}
                        image={heroIcon}
                        title="Sign Out"
                    />
                </ScrollView>
                <ToggleBackButton
                    navigation={this.props.navigation}
                    style={styles.backButton}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE,
        borderRightWidth: 2,
        borderRightColor: Color.YELLOW_500
    },
    profile: {
        alignItems: 'center',
        marginTop: emY(5)
    },
    image: {
        width: IMAGE_CONTAINER_SIZE,
        height: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        marginBottom: emY(1)
    },
    name: {
        color: Color.GREY_700,
        fontSize: emY(1.25),
        textAlign: 'center',
        marginBottom: emY(1)
    },
    title: {
        fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center',
        marginBottom: emY(1)
    },
    menuItems: {
        marginTop: emY(1),
        paddingLeft: emY(1.2)
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: emY(3)
    }
});

const mapStateToProps = state => ({
    userReadable: getUserReadable(state),
    orderId: getOrderId(state)
});
const mapDispatchToProps = {
    openCustomerPopup,
    signOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContent);
