// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import loaderGradient from '../assets/loader-gradient.png';
import loaderTicks from '../assets/loader-ticks.png';
// import races from '../assets/icons/races.png';
// import distance from '../assets/icons/distance.png';
// import earned from '../assets/icons/earned.png';
import inventory from '../assets/icons/inventory.png';
import history from '../assets/icons/history.png';
import contact from '../assets/icons/contact.png';
import payment from '../assets/icons/payment.png';
import avatarIcon from '../assets/icons/user.png';

import { online as goOnline, offline as goOffline } from '../actions/authActions';

import CustomerPopup from '../components/CommunicationPopup';
// import MenuButton from '../components/MenuButton';
import ProfileSwitch from '../components/HeroMain/ProfileSwitch';
// import Status from '../components/HeroMain/Status';
import MainItem from '../components/HeroMain/MainItem';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

export class HeroMainScreen extends Component {
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

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
    }

    goToPaymentInfo = () => {
        this.props.navigation.navigate('paymentInfo');
    };

    openContactPopup = () => {
        this.setState({ contactPopupVisible: true });
    };

    contactConfirmed = () => {
        this.setState({ contactPopupVisible: false });
    };

    render() {
        const { contactPopupVisible } = this.state;
        const {
            online
        } = this.props;

        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.loader}>
                        <View style={styles.imageContainer}>
                            <Image source={avatarIcon} style={styles.image} />
                        </View>
                        <Image source={loaderGradient} style={styles.gradient} />
                        <Image source={loaderTicks} style={styles.ticks} />
                    </View>
                    {/* <Text style={styles.name}>{name}</Text> */}
                    {/* <Text style={styles.viewProfile}>View Profile</Text> */}
                    <ProfileSwitch
                        online={online}
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
                            <MainItem image={inventory} title="Manage Inventory" />
                            <MainItem
                                image={contact}
                                title="Contact Us"
                                onPress={this.openContactPopup}
                            />
                        </View>
                        <View>
                            <MainItem image={history} title="Orders" />
                            <MainItem
                                image={payment}
                                title="Sign Out"
                                onPress={this.goToPaymentInfo}
                            />
                        </View>
                    </View>
                </View>
                <CustomerPopup openModal={contactPopupVisible} closeModal={this.contactConfirmed} />
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
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.GREY_300,
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
    online: state.auth.online
});

const mapDispatchToProps = dispatch => ({
    goOnline: () => dispatch(goOnline()),
    goOffline: () => dispatch(goOffline())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroMainScreen);
