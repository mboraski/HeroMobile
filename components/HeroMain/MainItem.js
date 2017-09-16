// Third Party Imports
import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image, 
    TouchableOpacity 
} from 'react-native'
import { connect } from 'react-redux'

// Relative Imports
import { emY } from '../../utils/em'
import Color from '../../constants/Color'
import oval from '../../assets/icons/oval17.png'

const WIDTH = emY(2.31)
const HEIGHT = emY(3.18)
const SIZE = emY(7)

type Props = {
    image: any,
    title: string
}

class MainItem extends Component {

    props: Props

    render() {
        const { image, title } = this.props
        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.touchableOpacity}>
                    <Image source={oval} style={styles.oval} />
                    <Image source={image} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: emY(7.25)
    },
    touchableOpacity: {
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: emY(0.83)
    },
    oval: {
        width: SIZE,
        height: SIZE
    },
    image: {
        position: 'absolute',
        maxWidth: WIDTH,
        maxHeight: HEIGHT,
        width: WIDTH,
        resizeMode: 'contain'
    },
    title: {
        fontSize: emY(0.875),
        color: Color.GREY_800,
        textAlign: 'center'
    },
})

const mapDispatchToProps = function (dispatch) {
    return {};
}

export default connect(null, mapDispatchToProps)(MainItem)
