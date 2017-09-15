// Third Party Imports
import React, { Component, PropTypes} from 'react'
import { 
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native'
import { Badge } from 'react-native-elements'

// Relative Imports
import { emY } from '../../utils/em'
import Color from '../../constants/Color'
import profile from '../../assets/icons/profile.png'

const SIZE = emY(1.44)
const BADGE_SIZE = emY(1.69)

class MenuItem extends Component {

    static propTypes = {
        image: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        badge: PropTypes.string
    }

    render() {
        let badgeElement = null;
        if (this.props.badge) {
            badgeElement = (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{this.props.badge}</Text>   
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={this.props.image} />  
                <Text style={styles.title}>{this.props.title}</Text> 
                { badgeElement }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
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
        alignItems:'center',
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
})

export default MenuItem
