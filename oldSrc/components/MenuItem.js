// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

// Relative Imports
import { emY } from '../utils/em';
import Color from '../constants/Color';

const SIZE = emY(1.44);
const BADGE_SIZE = emY(1.69);

type Props = {
    image: any,
    title: string,
    badge: string
};

class MenuItem extends Component {
    onPress = () => {
        const { route, activeItemKey, onPress } = this.props;
        const focused = route && activeItemKey === route.key;
        onPress({ route, focused });
    };

    props: Props;

    render() {
        const { image, title, badge, ...props } = this.props;
        let badgeElement = null;

        if (badge) {
            badgeElement = (
                <TouchableOpacity
                    {...props}
                    onPress={this.onPress}
                    style={styles.badgeContainer}
                >
                    <Text style={styles.badge}>{badge}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                {...props}
                onPress={this.onPress}
                style={styles.container}
            >
                <Image style={styles.image} source={image} />
                <Text style={styles.title}>{title}</Text>
                {badgeElement}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: emY(3.5),
        borderBottomWidth: 1,
        borderBottomColor: Color.GREY_200
    },
    image: {
        maxWidth: SIZE,
        maxHeight: SIZE,
        resizeMode: 'contain',
        marginRight: emY(1.4)
    },
    title: {
        fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center'
    },
    badgeContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: emY(1.2),
        width: BADGE_SIZE,
        height: BADGE_SIZE,
        borderRadius: BADGE_SIZE / 2,
        backgroundColor: Color.GREY_300
    },
    badge: {
        backgroundColor: 'transparent',
        color: Color.WHITE,
        fontSize: emY(0.83)
    }
});

export default MenuItem;
