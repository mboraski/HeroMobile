// Third Party Imports
import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    Platform
} from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

// Relative Imports
import loaderGradient from '../assets/loader-gradient.png'
import loaderTicks from '../assets/loader-ticks.png'
import races from '../assets/icons/races.png'
import distance from '../assets/icons/distance.png'
import earned from '../assets/icons/earned.png'
import inventory from '../assets/icons/inventory.png'
import history from '../assets/icons/history.png'
import contact from '../assets/icons/contact.png'
import payment from '../assets/icons/payment.png'

import SettingButton from '../components/SettingButton'
import MenuButtonRight from '../components/MenuButtonRight'
import ProfileSwitch from '../components/HeroMain/ProfileSwitch'
import Status from '../components/HeroMain/Status'
import MainItem from '../components/HeroMain/MainItem'
import Color from '../constants/Color'
import Style from '../constants/Style'
import { emY } from '../utils/em'

const SIZE = emY(7)
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25)

class HeroMainScreen extends Component {
    
    state = {
        name: 'Hanna Morgan'
    }

    render() {
        const name = this.state.name
        
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.loader}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.image} />
                        </View>
                        <Image source={loaderGradient} style={styles.gradient} />
                        <Image source={loaderTicks} style={styles.ticks} />
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.viewProfile}>View Profile</Text>
                    <ProfileSwitch/>
                    <View style={styles.statusContainer}>
                        <Status style={styles.status} image={races} title="Races" description="213"/>
                        <Status style={styles.status} image={distance} title="Distance" description="438km"/>
                        <Status style={styles.status} image={earned} title="Earned" description="$3123.00"/>
                    </View>
                    <View style={styles.mainItemContainer}>
                        <View>
                            <MainItem image={inventory} title="Manage Inventory"/>
                            <MainItem image={contact} title="Contact Us"/>
                        </View>
                        <View>
                            <MainItem image={history} title="History"/>
                            <MainItem image={payment} title="Payment Info"/>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <SettingButton/>
                        <MenuButtonRight/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 42,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loader: {
        marginTop: 32,
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
        borderRadius: (IMAGE_CONTAINER_SIZE) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [
            { translate: [0, -SIZE * 1] },
            { scale: 1 }
        ],
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [
            { translate: [-SIZE / 2, -SIZE / 2] }, 
            { scale: 1.4 }
        ],
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
})

HeroMainScreen.navigationOptions = {
    title: 'MainScreen',
    headerStyle: Style.headerBorderless,
    headerTitleStyle: Style.headerTitle
}

export default connect(() => ({}), null)(HeroMainScreen)
