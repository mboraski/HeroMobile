// Third Party Imports
import React, { Component } from 'react'
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

type Props = { address: string }

class Location extends Component {

    props: Props

    render() {
        const address = this.props

        return (
            <View style={styles.container}>
                <Image style={styles.image} source={location} />  
                <Text style={styles.title}>{address}</Text>          
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
