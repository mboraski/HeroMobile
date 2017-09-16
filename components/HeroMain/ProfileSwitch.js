// Third Party Imports
import React, { Component } from 'react'
import { 
    StyleSheet, 
    LayoutAnimation,
    TouchableOpacity, 
    Text, 
    View 
} from 'react-native'
import { connect } from 'react-redux'

// Relative Imports
import { emY } from '../../utils/em'
import Color from '../../constants/Color'

const WIDTH = emY(16.625);
const HEIGHT = emY(2.169);

class ProfileSwitch extends Component {

    state = {
        left: 0,
        text: 'Runner'
    }

    onRunner = () => {
        LayoutAnimation.spring()
        this.setState({
            left: 0,
            text: 'Runner'
        })
    }

    onDriver = () => {
        LayoutAnimation.spring()
        this.setState({
            left: WIDTH / 2,
            text: 'Driver'
        })
    }

    render() {
        const { left, text } = this.state
        
        return (
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <TouchableOpacity style={styles.leftContainer} onPress={this.onRunner} >
                        <Text style={styles.label}>Runner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.leftContainer} onPress={this.onDriver} >
                        <Text style={styles.label}>Driver</Text>
                    </TouchableOpacity>
                    <View style={[styles.switcher, {left: left}]}>
                        <Text style={styles.switcherLabel}>{text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        alignItems:'center',
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        width: WIDTH,
        alignItems:'center',
        backgroundColor: Color.GREY_200,
        borderRadius: HEIGHT / 2
    },
    leftContainer: {
        flex: 1,
        width: WIDTH / 2,
    },
    label: {
        fontSize: emY(1),
        textAlign: 'center',
        width: WIDTH / 2,
        backgroundColor: 'transparent'
    },
    switcher: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: Color.BLACK,
        width: WIDTH / 2,
        borderRadius: HEIGHT / 2
    },
    switcherLabel: {
        fontSize: emY(1),
        textAlign: 'center',
        color: Color.GREY_100,
        backgroundColor: 'transparent'
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(ProfileSwitch);
