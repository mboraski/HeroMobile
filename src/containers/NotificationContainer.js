import React, { Component } from 'react';
import { StyleSheet, Animated, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import Text from '../components/Text';
// import NotificationActions from '../actions/notificationActions';
import { orderStatuses, contractorStatuses } from '../constants/Order';
import { emY } from '../utils/em';
import {
    getStatus,
    getPending,
    getContractorStatus
} from '../selectors/orderSelectors';

class NotificationContainer extends Component {
    state = {
        topValue: new Animated.Value(0),
        opacity: new Animated.Value(1),
        nextTopValue: new Animated.Value(emY(11)),
        nextOpacity: new Animated.Value(0),
        nextNotification: 'Searching the skies for a Hero...',
        currNotification: 'Searching the skies for a hero...'
    };

    componentDidMount() {
        const newNotificaiton = this.getNotification();
        this.setState({ currNotification: newNotificaiton });
    }

    componentWillReceiveProps(nextProps) {
        const newNotificaiton = this.getNotification();
        this.setState({ nextNotification: newNotificaiton });
        if (
            this.props.status !== nextProps.status ||
            this.props.contractorStatus !== nextProps.contractorStatuses
        ) {
            this.receiveNotification();
        }
    }

    getNotification = () => {
        if (
            this.props.status === orderStatuses.satisfied &&
            this.props.contractorStatus === contractorStatuses.en_route
        ) {
            return 'Hero is en route to you!';
        } else if (
            this.props.status === orderStatuses.satisfied &&
            this.props.contractorStatus === contractorStatuses.arrived
        ) {
            return 'Hero has arrived!';
        } else {
            switch (this.props.status) {
                case orderStatuses.open:
                    return 'Contacting Heroes...';
                case orderStatuses.inProgress:
                    return 'Contacting Heroes...';
                case orderStatuses.satisfied:
                    return 'A Hero has answered your call!';
                case orderStatuses.completed:
                    return 'Order completed, see you again soon!';
                case orderStatuses.cancelled:
                    return 'No Heroes could answer your call.';
                default:
                    return 'Searching the skies for a Hero...';
            }
        }
    };

    receiveNotification = () => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 500
            }),
            Animated.timing(this.state.nextTopValue, {
                toValue: 0,
                duration: 500
            }),
            Animated.timing(this.state.nextOpacity, {
                toValue: 1,
                duration: 500
            })
        ]).start(() => {
            const newNotificaiton = this.getNotification();
            this.setState({ currNotification: newNotificaiton });
            this.setState({ opacity: new Animated.Value(1) });
            this.setState({ nextOpacity: new Animated.Value(0) });
            this.setState({ nextTopValue: new Animated.Value(emY(11)) });
        });
    };

    render() {
        const { nextNotification, currNotification } = this.state;
        return (
            <View style={styles.alertSection}>
                <Animated.View
                    style={[
                        styles.alert,
                        {
                            opacity: this.state.opacity,
                            top: this.state.topValue
                        }
                    ]}
                >
                    <Text style={styles.alertText}>{currNotification}</Text>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.alert,
                        {
                            opacity: this.state.nextOpacity,
                            top: this.state.nextTopValue
                        }
                    ]}
                >
                    <Text style={styles.alertText}>{nextNotification}</Text>
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

const mapStateToProps = state => ({
    status: getStatus(state),
    pending: getPending(state),
    contractorStatus: getContractorStatus(state)
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationContainer);
