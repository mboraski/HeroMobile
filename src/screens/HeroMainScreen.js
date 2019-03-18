// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
// import loaderGradient from '../assets/loader-gradient.png';
// import loaderTicks from '../assets/loader-ticks.png';
// import races from '../assets/icons/races.png';
// import distance from '../assets/icons/distance.png';
// import earned from '../assets/icons/earned.png';
import inventory from '../assets/icons/inventory.png';
import history from '../assets/icons/history2.png';
// import contact from '../assets/icons/contact.png';
import logoOrange from '../assets/icons/logo-orange.png';
import avatarIcon from '../assets/mark.png';
import { dropdownAlert } from '../actions/uiActions';
import { signOut } from '../actions/authActions';
import {
    offline as goOffline,
    fetchContractor
} from '../actions/contractorActions';
import { getCurrentLocation } from '../actions/mapActions';
import { fetchProducts } from '../actions/productActions';

import {
    getOnline,
    getPending,
    getOnlineStatusPending,
    getFirstName,
    getLastName
} from '../selectors/contractorSelectors';
import { getHeroAvailables } from '../selectors/cartSelectors';
import { getCoords } from '../selectors/mapSelectors';

// import CustomerPopup from '../components/CommunicationPopup';
// import MenuButton from '../components/MenuButton';
import ProfileSwitch from '../components/HeroMain/ProfileSwitch';
// import Status from '../components/HeroMain/Status';
import MainItem from '../components/HeroMain/MainItem';
import Text from '../components/Text';

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

    componentDidMount() {
        this.props.fetchContractor();
    }

    signOut = () => {
        // TODO: needs to take user offline first
        this.props.signOut();
        // TODO: remove
        this.props.navigation.navigate('auth');
    };

    currentInventory = () => {
        console.log('current Inventory ran');
        this.props.navigation.navigate('currentInventory');
    };

    updateInventory = () => {
        if (!this.props.online) {
            this.props.navigation.navigate('updateInventory');
        } else {
            this.props.dropdownAlert(
                true,
                'Go offline before editing inventory'
            );
        }
    };

    orders = () => {
        if (this.props.online) {
            this.props.navigation.navigate('orders');
        } else {
            this.props.dropdownAlert(true, 'Must be online');
        }
    };

    useCurrentLocation = () => {
        this.props.getCurrentLocation(this.props.heroAvailables);
    };

    render() {
        const {
            online,
            facebookInfo,
            pending,
            firstName,
            lastName,
            region,
            onlineStatusPending
        } = this.props;

        return (
            <View style={styles.container}>
                {!pending ? (
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.loader}>
                            <View style={styles.imageContainer}>
                                {facebookInfo && facebookInfo.photoURL ? (
                                    <Image
                                        source={{ uri: facebookInfo.photoURL }}
                                        style={styles.image}
                                    />
                                ) : (
                                    <Image
                                        source={avatarIcon}
                                        style={styles.image}
                                    />
                                )}
                            </View>
                        </View>
                        {onlineStatusPending && (
                            <ActivityIndicator
                                animating={onlineStatusPending}
                                size="large"
                                color="#f5a623"
                            />
                        )}
                        <Text style={styles.name}>
                            {firstName} {lastName}
                        </Text>
                        {/* <Text style={styles.name}>{name}</Text> */}
                        {/* <Text style={styles.viewProfile}>View Profile</Text> */}
                        <ProfileSwitch
                            online={online}
                            region={region}
                            goOnline={this.useCurrentLocation}
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
                                    title="View Inventory"
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
                                    image={logoOrange}
                                    title="Sign Out"
                                    onPress={this.signOut}
                                />
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.overlay}>
                        <ActivityIndicator
                            animating={pending}
                            size="large"
                            color="#f5a623"
                        />
                    </View>
                )}
            </View>
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
        flex: 1,
        height: emY(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
        marginBottom: emY(1)
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
    },
    overlay: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
});

const mapStateToProps = state => ({
    // header: state.header,
    online: getOnline(state),
    pending: getPending(state),
    onlineStatusPending: getOnlineStatusPending(state),
    firstName: getFirstName(state),
    lastName: getLastName(state),
    region: getCoords(state),
    heroAvailables: getHeroAvailables(state)
});

const mapDispatchToProps = {
    goOffline,
    fetchContractor,
    signOut,
    dropdownAlert,
    getCurrentLocation,
    fetchProducts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeroMainScreen);
