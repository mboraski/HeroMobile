// Third Party Imports
import React, { Component, PropTypes} from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import { connect } from 'react-redux'

// Relative Imports
import { emY } from '../../utils/em'
import Color from '../../constants/Color'

const SIZE = emY(1.75)

class Status extends Component {

    static propTypes = {
        image: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={this.props.image} />
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.description}>{this.props.description}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        width: emY(7.25)
    },
    image: {
        maxWidth: SIZE,
        maxHeight: SIZE,
        marginBottom: emY(0.8)
    },
    title: {
        fontSize: emY(0.831),
        color: Color.GREY_300,
        textAlign: 'center',
        marginBottom: emY(0.2)
    },
    description: {
        fontSize: emY(1),
        color: Color.GREY_800,
        textAlign: 'center'
    }
})

const mapDispatchToProps = function (dispatch) {
    return {};
}

export default connect(null, mapDispatchToProps)(Status)
