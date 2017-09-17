// Third Party Imports
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

// Relative Imports
import { emY } from '../../utils/em';
import Color from '../../constants/Color';

const SIZE = emY(1.44);
const BADGE_SIZE = emY(1.69);

type Props = {
    image: any,
    title: string,
    badge: string
};

class MenuItem extends Component {
    props: Props;

    render() {
        const { image, title, badge } = this.props;
        let badgeElement = null;

        if (badge) {
            badgeElement = (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{badge}</Text>   
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={image} />  
                <Text style={styles.title}>{title}</Text> 
                { badgeElement }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: emY(3.92),
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
        backgroundColor: Color.GREY_300,
    },
    badge: {
        backgroundColor: 'transparent',
        color: Color.WHITE,
        fontSize: emY(1)
    }
});

export default MenuItem;
