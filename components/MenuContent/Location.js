// Third Party Imports
import React, { Component, PropTypes} from 'react'
import { 
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native'

// Relative Imports
import { emY } from '../../utils/em'
import Color from '../../constants/Color'
import location from '../../assets/icons/location.png'

const SIZE = emY(0.656)


class Location extends Component {

    static propTypes = {
        address: PropTypes.string.isRequired
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={location} />  
                <Text style={styles.title}>{this.props.address}</Text>          
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: {
        maxWidth: SIZE,
        maxHeight: SIZE,
        resizeMode: 'contain',
        marginRight: emY(0.3)
    },
    title: {
        fontSize: emY(0.831),
        color: Color.GREY_700,
        textAlign: 'center'
	},
})

export default Location
