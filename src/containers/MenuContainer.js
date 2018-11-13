import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
// import { Notifications } from 'expo';

// Relative Imports
import { emY } from '../utils/em';
import Color from '../constants/Color';
import MenuItem from '../components/MenuItem';
import Text from '../components/Text';
import ToggleBackButton from '../components/ToggleBackButton';
import heroIcon from '../assets/icons/logo-black.png';
// import notificationIcon from '../assets/icons/notification.png';
// import cartIcon from '../assets/icons/cart.png';
// import paymentIcon from '../assets/icons/payment.png';
import historyIcon from '../assets/icons/history.png';
// import locationIcon from '../assets/icons/location.png';
import { openCustomerPopup } from '../actions/uiActions';
import { signOut } from '../actions/authActions';
import { getUserReadable } from '../selectors/authSelectors';

const IMAGE_CONTAINER_SIZE = emY(2);

const getRoute = (items, routeName) =>
    items.find(item => item.key === routeName);

class MenuContent extends Component {
    mainPress = () => {
        this.props.navigation.navigate('main');
    };

    ordersPress = () => {
        this.props.navigation.navigate('orders');
    };

    orderPress = () => {
        this.props.navigation.navigate('deliveryStatus');
    };

    checkoutPress = () => {
        this.props.navigation.navigate('checkout');
    };

    productsPress = () => {
        this.props.navigation.navigate('products');
    };

    mapPress = () => {
        this.props.navigation.navigate('map');
    };

    paymentMethod = () => {
        this.props.navigation.navigate('paymentMethod');
    };

    signOut = () => {
        this.props.signOut();
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('auth');
    };

    render() {
        const { items, activeItemKey, userReadable } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    {userReadable ? (
                        <Text style={styles.name}>
                            {userReadable.firstName} {userReadable.lastName}
                        </Text>
                    ) : null}
                </View>
                <ScrollView style={styles.menuItems}>
                    <MenuItem
                        onPress={this.ordersPress}
                        image={heroIcon}
                        title="Orders"
                    />
                    <MenuItem
                        onPress={this.mainPress}
                        image={heroIcon}
                        title="Hero Main"
                    />
                    {/*<MenuItem
                        route={getRoute(items, 'order')}
                        activeItemKey={activeItemKey}
                        onPress={this.orderPress}
                        image={notificationIcon}
                        title="Order"
                        // badge="0"
                    />*/}
                    {/*<MenuItem
                        route={getRoute(items, 'checkout')}
                        activeItemKey={activeItemKey}
                        onPress={this.checkoutPress}
                        image={cartIcon}
                        title="Checkout"
                    />*/}
                    {/*<MenuItem
                        route={getRoute(items, 'products')}
                        activeItemKey={activeItemKey}
                        onPress={this.productsPress}
                        image={historyIcon}
                        title="Products"
                    />*/}
                    {/*<MenuItem
                        route={getRoute(items, 'map')}
                        activeItemKey={activeItemKey}
                        onPress={this.mapPress}
                        image={locationIcon}
                        title="Map"
                    />*/}
                    {/*<MenuItem
                        route={getRoute(items, 'paymentMethod')}
                        activeItemKey={activeItemKey}
                        onPress={this.paymentMethod}
                        image={paymentIcon}
                        title="Payment Info"
                    />*/}
                    {/* <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={heroIcon}
                        title="Heroes Needed!"
                    /> */}
                    <MenuItem
                        onPress={() => {}}
                        image={historyIcon}
                        title="History"
                    />
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
                    <Text style={styles.copyright}>@2018 Hasty</Text>
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
        paddingLeft: emY(1.2)
    },
    copyright: {
        height: emY(1),
        marginTop: emY(4.56),
        marginBottom: emY(0.9),
        fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center'
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: emY(3)
    }
});

const mapStateToProps = state => ({
    userReadable: getUserReadable(state)
});
const mapDispatchToProps = { openCustomerPopup, signOut };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContent);
