// Third Part Imports
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import messageIcon from '../assets/icons/multi_message.png';
import logo from '../assets/icons/HastyOrangeIcon.png';
import mark from '../assets/mark.png';

const PROFILE_IMAGE_SIZE = emY(3.75);
const CHAT_SIZE = emY(2.8);
const CHAT_IMAGE_SIZE = emY(1.65);

const HeroDetail = props => {
    const {
        firstName,
        lastName,
        deliveryTime,
        heroStatus,
        contractorId,
        contactContractor,
        notificationCount
    } = props;

    const callContractor = () => contactContractor(contractorId);

    const profileImage = props.profileImage || mark || logo;

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} source={profileImage} />
            <View style={styles.content}>
                <View style={styles.contentPrimary}>
                    <View style={styles.meta}>
                        <Text style={[styles.metaItem, styles.name]}>
                            {firstName.toUpperCase()} {lastName.toUpperCase()}
                        </Text>
                        <Text style={[styles.metaItem, styles.link]}>
                            <MaterialIcons
                                name="check"
                                size={16}
                                style={styles.check}
                            />
                            {'Confirmed for order'}
                        </Text>
                        <Text style={[styles.metaItem, styles.deliveryTime]}>
                            Delivery Time: ~{deliveryTime / 60} min
                        </Text>
                        <Text
                            style={[
                                styles.metaItem,
                                styles.metaItemLast,
                                styles.deliveryTime
                            ]}
                        >
                            Status: {heroStatus}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.chatButton}
                onPress={callContractor}
            >
                <Image source={messageIcon} style={styles.chatImage} />
                {notificationCount > 0 && (
                    <View style={styles.notificationIcon}>
                        <Text style={styles.notificationNumber}>
                            {notificationCount}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

// <TouchableOpacity
//     onPress={() => {
//     }}
// >
//     <Text style={[styles.metaItem, styles.link]}>
//         <MaterialIcons name="check" size={16} style={styles.check} />{'Confirmed Order'}
//     </Text>
// </TouchableOpacity>

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingBottom: emY(0.875),
        marginLeft: 27,
        marginRight: 27,
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderColor: Color.GREY_300
    },
    content: { flex: 1 },
    contentPrimary: { flexDirection: 'row' },
    meta: {
        flex: 1,
        marginTop: emY(1)
    },
    metaItem: {
        fontSize: emY(1),
        marginBottom: emY(0.4375)
    },
    metaItemLast: {
        marginBottom: 0
    },
    link: {
        color: Color.DEFAULT
    },
    name: {},
    type: {},
    deliveryTime: {},
    check: {},
    chatButton: {
        backgroundColor: Color.GREY_400,
        width: CHAT_SIZE,
        height: CHAT_SIZE,
        borderRadius: CHAT_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: emY(0.7)
    },
    chatImage: {
        borderRadius: 0,
        width: CHAT_IMAGE_SIZE,
        height: (CHAT_IMAGE_SIZE * 13) / 15
    },
    profileImage: {
        marginTop: emY(0.7),
        marginRight: emY(0.7),
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2
    },
    notificationIcon: {
        position: 'absolute',
        top: -3,
        right: -3,
        width: CHAT_IMAGE_SIZE / 1.5,
        height: CHAT_IMAGE_SIZE / 1.5,
        backgroundColor: 'red',
        borderRadius: CHAT_IMAGE_SIZE / 3
    },
    notificationNumber: {
        fontSize: emY(0.9),
        color: '#fff',
        textAlign: 'center'
    }
});

export default HeroDetail;
