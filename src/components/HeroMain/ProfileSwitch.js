// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../../utils/em';
import Color from '../../constants/Color';

const WIDTH = emY(16.625);
const HEIGHT = emY(2.169);

class ProfileSwitch extends Component {
    state = {
        leftVal: 0,
        text: 'Offline'
    };

    componentWillMount() {
        if (this.props.online) {
            LayoutAnimation.spring()
            this.setState({
                leftVal: WIDTH / 2,
                text: 'Online'
            });
        } else {
            LayoutAnimation.spring()
            this.setState({
                leftVal: 0,
                text: 'Offline'
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.online !== nextProps.online) {
            if (nextProps.online) {
                LayoutAnimation.spring()
                this.setState({
                    leftVal: WIDTH / 2,
                    text: 'Online'
                });
            } else {
                LayoutAnimation.spring()
                this.setState({
                    leftVal: 0,
                    text: 'Offline'
                });
            }
        }
    }

    render() {
        const { leftVal, text } = this.state;
        const { goOnline, goOffline } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <TouchableOpacity style={styles.leftContainer} onPress={goOffline} >
                        <Text style={styles.label}>Offline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.leftContainer} onPress={goOnline} >
                        <Text style={styles.label}>Online</Text>
                    </TouchableOpacity>
                    <View style={[styles.switcher, { left: leftVal }]}>
                        <Text style={styles.switcherLabel}>{text}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        alignItems: 'center',
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        width: WIDTH,
        alignItems: 'center',
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
