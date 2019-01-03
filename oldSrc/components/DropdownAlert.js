// Third Party Imports
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    StatusBar,
    Platform
} from 'react-native';

// Relative Imports
import Color from '../constants/Color';

export default class DropdownAlert extends Component {
    static defaultProps = {
        closeInterval: 2000,
        onOpenAnimationComplete: () => {},
        onCloseAnimationComplete: () => {}
    };

    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.translateYAnimValue = new Animated.Value(-100);
        this.openAnimation = Animated.timing(this.translateYAnimValue, {
            toValue: 0,
            duration: 500
        });
        this.closeAnimation = Animated.timing(this.translateYAnimValue, {
            toValue: -100,
            duration: 500
        });
    }

    componentDidMount() {
        if (this.props.visible && !this.state.visible) {
            this.openAnimation.start(this.handleOpenAnimationComplete);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.visible !== this.props.visible ||
            (nextProps.visible && !this.state.visible)
        ) {
            if (nextProps.visible) {
                if (!this.state.visible) {
                    this.openAnimation.start(this.handleOpenAnimationComplete);
                }
            } else if (this.state.visible) {
                this.closeAnimation.start(this.handleCloseAnimationComplete);
            }
        }
    }

    handleOpenAnimationComplete = () => {
        this.setState({ visible: true }, () => {
            if (this.timeoutId != null) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(() => {
                if (this.state.visible) {
                    this.closeAnimation.start(
                        this.handleCloseAnimationComplete
                    );
                }
            }, this.props.closeInterval);
        });
        this.props.onOpenAnimationComplete();
    };

    handleCloseAnimationComplete = () => {
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.setState({ visible: false });
        this.props.onCloseAnimationComplete();
    };

    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        paddingTop:
                            Platform.OS === 'android'
                                ? StatusBar.currentHeight
                                : 20,
                        transform: [
                            {
                                translateY: this.translateYAnimValue
                            }
                        ]
                    }
                ]}
            >
                <Text style={styles.text}>{this.props.text}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.YELLOW_600,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    text: {
        padding: 10,
        color: '#fff'
    }
});
