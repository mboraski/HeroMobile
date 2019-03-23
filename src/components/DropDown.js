// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';

// Relative Imports
import { emY } from '../utils/em';
import arrowIcon from '../assets/icons/disclosureIndicator.png';
import Color from '../constants/Color';

class DropDown extends Component {
    state = {
        expanded: true,
        animation: new Animated.Value(),
        maxHeight: 0,
        minHeight: emY(3) + 2 * StyleSheet.hairlineWidth,
        spinValue: new Animated.Value(0)
    };

    componentDidMount() {
        const { minHeight } = this.state;
        this.props.dropDownRef(this);
        this.state.animation.setValue(0);
        Animated.spring(this.state.animation, {
            toValue: minHeight
        }).start();
        this.state.spinValue.setValue(1);
        Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 400
        }).start();
        this.setState({
            expanded: false
        });
    }

    componentWillUnmount() {
        this.props.dropDownRef(undefined);
    }

    setMaxHeight = event => {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    };

    setMinHeight = event => {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    };

    toggle = () => {
        const initialValue = this.state.expanded
            ? this.state.maxHeight + this.state.minHeight
            : this.state.minHeight;
        const finalValue = this.state.expanded
            ? this.state.minHeight
            : this.state.maxHeight + this.state.minHeight;
        const initialDegree = this.state.expanded ? 0 : 1;
        const finalDegree = this.state.expanded ? 1 : 0;
        this.setState({
            expanded: !this.state.expanded
        });
        this.state.animation.setValue(initialValue);
        Animated.spring(this.state.animation, {
            toValue: finalValue
        }).start();
        this.state.spinValue.setValue(initialDegree);
        Animated.timing(this.state.spinValue, {
            toValue: finalDegree,
            duration: 400
        }).start();
    };

    render() {
        const { header, children } = this.props;
        const { animation } = this.state;
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['-180deg', '0deg']
        });
        return (
            <Animated.View style={[styles.container, { height: animation }]}>
                <View onLayout={this.setMinHeight}>
                    <TouchableOpacity onPress={this.toggle}>
                        {header}
                        {children && (
                            <View style={styles.arrowIconContainer}>
                                <Animated.Image
                                    source={arrowIcon}
                                    style={[
                                        styles.arrowIcon,
                                        {
                                            transform: [{ rotate: spin }]
                                        }
                                    ]}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View onLayout={this.setMaxHeight}>{children && children}</View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.GREY_100,
        overflow: 'hidden'
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrowIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10
    },
    arrowIcon: {
        width: emY(0.9),
        height: emY(0.9)
    }
});

export default DropDown;
