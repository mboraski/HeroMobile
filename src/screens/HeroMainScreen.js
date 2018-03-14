// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import firebase from '../firebase';
import { Text } from '../components/Text';
// import loaderGradient from '../assets/loader-gradient.png';
// import loaderTicks from '../assets/loader-ticks.png';
// import races from '../assets/icons/races.png';
// import distance from '../assets/icons/distance.png';
// import earned from '../assets/icons/earned.png';
import inventory from '../assets/icons/inventory.png';
import history from '../assets/icons/history2.png';
// import contact from '../assets/icons/contact.png';
import logoBlack from '../assets/icons/logo-black3.png';
import avatarIcon from '../assets/icons/user.png';
import { getFacebookInfo } from '../selectors/authSelectors';
import { fetchProductsRequest } from '../actions/productActions';
import { dropdownAlert } from '../actions/uiActions';
import {
    online as goOnline,
    offline as goOffline,
    getUserOnlineStatus,
    signOut
} from '../actions/authActions';

// import CustomerPopup from '../components/CommunicationPopup';
// import MenuButton from '../components/MenuButton';
import ProfileSwitch from '../components/HeroMain/ProfileSwitch';
// import Status from '../components/HeroMain/Status';
import MainItem from '../components/HeroMain/MainItem';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

class HeroMainScreen extends Component {
    static navigationOptions = {
        title: 'HERO',
        headerLeft: null,
        headerRight: null,
        headerStyle: Style.headerBorderless,
        headerTitleStyle: Style.headerTitleLogo
    };

    state = {
        contactPopupVisible: false
    };

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.header.toggleState !== nextProps.header.toggleState) {
    //         if (nextProps.header.isMenuOpen) {
    //             this.props.navigation.navigate('DrawerOpen');
    //         } else {
    //             this.props.navigation.navigate('DrawerClose');
    //         }
    //     }
    // }

    componentDidMount() {
        this.props.getUserOnlineStatus();
        this.props.fetchProductsRequest();
    }

    componentWillUnmount() {
        firebase.database().ref('products/US/TX/Austin').off();
    }

    // goToPaymentInfo = () => {
    //     this.props.navigation.navigate('paymentInfo');
    // };

    signOut = () => {
        this.props.signOut();
    };

    currentInventory = () => {
        this.props.navigation.navigate('currentInventory');
    };

    updateInventory = () => {
        if (!this.props.online) {
            this.props.navigation.navigate('updateInventory');
        } else {
            this.props.dropdownAlert(true, 'Go offline before editing inventory');
        }
    };

    orders = () => {
        if (this.props.online) {
            this.props.navigation.navigate('deliveryStatus');
        } else {
            this.props.dropdownAlert(true, 'Go online before editing inventory');
        }
    };

    // openContactPopup = () => {
    //     this.setState({ contactPopupVisible: true });
    // };

    // contactConfirmed = () => {
    //     this.setState({ contactPopupVisible: false });
    // };

    render() {
        // const { contactPopupVisible } = this.state;
        const {
            online,
            contractorProducts,
            currentLocation,
            facebookInfo,
            pending
        } = this.props;
        console.log('facebookInfo: ', facebookInfo);

        return (
            <ScrollView style={styles.scrollContainer}>
                {!pending ?
                    <View style={styles.container}>
                        <View style={styles.loader}>
                            <View style={styles.imageContainer}>
                                {facebookInfo && facebookInfo.photoURL ? (
                                    <Image
                                        source={{ uri: facebookInfo.photoURL }}
                                        style={styles.image}
                                    />
                                ) :
                                    <Image
                                        source={avatarIcon}
                                        style={styles.image}
                                    />
                                }
                            </View>
                        </View>
                        {/* <Text style={styles.name}>{name}</Text> */}
                        {/* <Text style={styles.viewProfile}>View Profile</Text> */}
                        <ProfileSwitch
                            online={online}
                            contractorProducts={contractorProducts}
                            currentLocation={currentLocation}
                            goOnline={this.props.goOnline}
                            goOffline={this.props.goOffline}
                        />
                        {/* <View style={styles.statusContainer}>
                            <Status
                                style={styles.status}
                                image={races}
                                title="Races"
                                description="213"
                            />
                            <Status
                                style={styles.status}
                                image={distance}
                                title="Distance"
                                description="438km"
                            />
                            <Status
                                style={styles.status}
                                image={earned}
                                title="Earned"
                                description="$3123.00"
                            />
                        </View> */}
                        <View style={styles.mainItemContainer}>
                            <View>
                                <MainItem
                                    image={inventory}
                                    title="Current Inventory"
                                    onPress={this.currentInventory}
                                />
                                <MainItem
                                    image={inventory}
                                    title="Update Inventory"
                                    onPress={this.updateInventory}
                                />
                            </View>
                            <View>
                                <MainItem
                                    image={history}
                                    title="Orders"
                                    onPress={this.orders}
                                />
                                <MainItem
                                    image={logoBlack}
                                    title="Sign Out"
                                    onPress={this.signOut}
                                />
                            </View>
                        </View>
                    </View> :
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    />
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loader: {
        marginTop: 0,
        height: emY(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: emY(1)
    },
    imageContainer: {
        flexDirection: 'row',
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [0, -SIZE * 1] }, { scale: 1 }]
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [-SIZE / 2, -SIZE / 2] }, { scale: 1.4 }]
    },
    name: {
        color: Color.BLACK,
        fontSize: emY(1.25),
        textAlign: 'center',
        marginBottom: emY(0.606)
    },
    viewProfile: {
        color: Color.BLACK,
        fontSize: emY(0.831),
        textAlign: 'center',
        marginBottom: emY(1.5)
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: emY(1.75),
        marginRight: emY(1.75),
        marginTop: emY(1.94)
    },
    mainItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: emY(3.5),
        marginRight: emY(3.5),
        marginTop: emY(1.25),
        marginBottom: emY(1)
    }
});

const mapStateToProps = state => ({
    // header: state.header,
    online: state.auth.online,
    contractorProducts: state.inventory.inventory,
    currentLocation: { lat: 43.23223, lon: -97.293023 },
    facebookInfo: getFacebookInfo(state),
    pending: state.inventory.pending
});

const mapDispatchToProps = {
    goOnline,
    goOffline,
    getUserOnlineStatus,
    signOut,
    fetchProductsRequest,
    dropdownAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroMainScreen);
