import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotificationActions from '../actions/notificationActions';
import Color from '../constants/Color';
import { emY } from '../utils/em';

const DEFAULT_NOTIFICATION = 'Searching the skies for signs of a hero...';
const notificationList = [
    'Found a hero!',
    'Looking for another to complete the order...',
    'Found a hero!',
    'Your heroes are on their way!',
    'Jessica has arrived',
    'Jessica completed order',
    'Matt has arrived',
    'Matt completed order',
    'Your order is complete!'
];

export class Notification extends Component {
    state = {
        topValue: new Animated.Value(emY(11)),
        opacity: new Animated.Value(1),
        prevNotificaiton: DEFAULT_NOTIFICATION,
        currNotificaiton: DEFAULT_NOTIFICATION
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    receiveNotification = () => {
        const { actions } = this.props;
        const newNotificaiton = notificationList[this.props.i];
        this.setState({ currNotificaiton: newNotificaiton });
        actions.nextNotificaiton({ index: this.props.i + 1 });
        Animated.parallel([
            Animated.timing(this.state.topValue, {
                toValue: 0,
                duration: 500
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 500
            })
        ]).start(() => {
            this.setState({ prevNotificaiton: newNotificaiton });
            Animated.parallel([
                Animated.timing(this.state.topValue, {
                    toValue: emY(11),
                    duration: 0
                }),
                Animated.timing(this.state.opacity, {
                    toValue: 1,
                    duration: 0
                })
            ]).start();
        });
    };

    render() {
        const { prevNotificaiton, currNotificaiton } = this.state;
        return (
            <View style={styles.alertSection}>
                <Animated.View
                    style={[
                        styles.alert,
                        { opacity: this.state.opacity, top: 0 }
                    ]}
                >
                    <Text style={styles.alertText}>{prevNotificaiton}</Text>
                </Animated.View>
                <Animated.View
                    style={[styles.alert, { top: this.state.topValue }]}
                >
                    <Text style={styles.alertText}>{currNotificaiton}</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alertSection: {
        height: emY(10),
        overflow: 'hidden'
    },
    alert: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.375) },
                shadowOpacity: 0.25,
                shadowRadius: emY(0.8125)
            },
            android: {
                elevation: 6
            }
        }),
        backgroundColor: '#F5A623',
        paddingVertical: emY(1.25),
        position: 'absolute',
        left: 27,
        right: 27
    },
    alertText: {
        fontSize: emY(1.0625),
        color: '#fff',
        textAlign: 'center'
    }
});

const mapStateToProps = ({ notification }) => ({ i: notification.index || 0 });

const mapDispatchToProps = function(dispatch) {
    const notificationActions = bindActionCreators(
        NotificationActions,
        dispatch
    );

    return {
        actions: {
            nextNotificaiton: notificationActions.newNotificaiton
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);
