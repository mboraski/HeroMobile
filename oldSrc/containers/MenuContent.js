import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import Color from '../constants/Color';
import MenuItem from '../components/MenuItem';
import ToggleBackButton from '../components/ToggleBackButton';
import heroIcon from '../assets/icons/logo-black.png';
import historyIcon from '../assets/icons/history.png';
import favoriteIcon from '../assets/icons/favorite.png';
import notificationIcon from '../assets/icons/notification.png';
// eslint-disable-next-line import/no-unresolved
import cartIcon from '../assets/icons/cart.png';
import paymentIcon from '../assets/icons/payment.png';
import promotionIcon from '../assets/icons/promotion.png';
import helpIcon from '../assets/icons/info.png';
import tempAvatar from '../assets/profile.png';
import { openCustomerPopup } from '../actions/uiActions';
import { signOut } from '../actions/authActions';

const IMAGE_CONTAINER_SIZE = emY(6.25);

const getRoute = (items, routeName) =>
    items.find(item => item.key === routeName);

class MenuContent extends Component {
    state = {
        name: 'Hanna Morgan',
        avatar: 'https://facebook.github.io/react/img/logo_og.png'
    };

    handleViewProfile = () => {
        this.props.navigation.navigate('profile');
    };

    cartPress = () => {
        this.props.navigation.navigate('cart');
    };

    handleHelpPress = () => {
        this.props.navigation.navigate('DrawerClose');
        this.props.openCustomerPopup();
    };

    paymentInfoPress = () => {
        this.props.navigation.navigate('paymentMethod');
    };

    promotionSharePress = () => {
        this.props.navigation.navigate('promotionShare');
    };

    signOut = () => {
        this.props.navigation.navigate('DrawerClose');
        this.props.signOut();
    };

    render() {
        const { items, activeItemKey, onItemPress } = this.props;
        const { name, avatar } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image source={tempAvatar} style={styles.image} />
                    <Text style={styles.name}>{name}</Text>
                    <TouchableOpacity onPress={this.handleViewProfile}>
                        <Text style={styles.title}>View Profile</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.menuItems}>
                    <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={heroIcon}
                        title="Heroes Needed!"
                    />
                    <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={historyIcon}
                        title="History"
                    />
                    <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={favoriteIcon}
                        title="Favorites & Recommended"
                    />
                    <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={onItemPress}
                        image={notificationIcon}
                        title="Notifications"
                        badge="3"
                    />
                    <MenuItem
                        route={getRoute(items, 'cart')}
                        activeItemKey={activeItemKey}
                        onPress={this.cartPress}
                        image={cartIcon}
                        title="Cart"
                    />
                    <MenuItem
                        route={getRoute(items, 'paymentMethod')}
                        activeItemKey={activeItemKey}
                        onPress={this.paymentInfoPress}
                        image={paymentIcon}
                        title="Payment Info"
                    />
                    <MenuItem
                        route={getRoute(items, 'promotionShare')}
                        activeItemKey={activeItemKey}
                        onPress={this.promotionSharePress}
                        image={promotionIcon}
                        title="Promotions"
                    />
                    <MenuItem
                        activeItemKey={activeItemKey}
                        onPress={this.handleHelpPress}
                        image={helpIcon}
                        title="Help"
                    />
                    <MenuItem
                        onPress={this.signOut}
                        image={helpIcon}
                        title="Sign Out"
                    />
                    <Text style={styles.copyright}>@2017 Hasty</Text>
                </ScrollView>
                <ToggleBackButton style={styles.backButton} />
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
        marginTop: emY(2.68)
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
        marginLeft: emY(1.2)
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
        top: emY(2.1)
    }
});

const mapDispatchToProps = { openCustomerPopup, signOut };

export default connect(
    null,
    mapDispatchToProps
)(MenuContent);
