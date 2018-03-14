// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import _ from 'lodash';

// Relative Imports
// import loaderGradient from '../assets/loader-gradient.png';
// import loaderTicks from '../assets/loader-ticks.png';
import BackButton from '../components/BackButton';
import BrandButton from '../components/BrandButton';
// import Notification from '../components/Notification';
// import HeroList from '../components/HeroList';
// import Spinner from '../components/Spinner';
import Text from '../components/Text';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import orderStatuses from '../constants/Order';
// import tempAvatar from '../assets/profile.png';
import { getHero } from '../selectors/authSelectors';
import { dropdownAlert } from '../actions/uiActions';
import {
    fishOrdersRequest
} from '../actions/orderActions';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

class DeliveryStatusScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Order',
        headerLeft: <BackButton onPress={() => navigation.goBack()} />,
        headerRight: <BrandButton />,
        headerStyle: Style.headerBorderless,
        headerTitleStyle: [Style.headerTitle, Style.headerTitleLogo]
    });

    componentDidMount() {
        this.props.fishOrdersRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
        if (!this.props.potentialOrders && nextProps.potentialOrders) {
            this.props.dropdownAlert(true, 'New order request!');
        } else {
            this.props.dropdownAlert(false, '');
        }
    }

    acceptRequest = (order) => {
        this.props.acceptRequest({
            orderId: order.orderId,
            productsSatisfied: this.props.productsSatisfied,
            hero: this.props.hero
        });
    }

    renderOrderRequests = () => {
        const {
            potentialOrders,
            state
        } = this.props;
        let result;
        if (state === orderStatuses.unaccepted) {
            result = null;
        } else {
            result = _.map(potentialOrders, (order) => (
                <View style={styles.state}>
                    <View style={styles.meta}>
                        <Text style={styles.label}>Order Request:</Text>
                    </View>
                    <Button
                        onPress={this.acceptRequest.bind(this, order)}
                        title="ACCEPT REQUEST"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            ));
        }
        return result;
    }

    renderAccepted = () => {
        const { currentOrder, state } = this.props;
        if (state === orderStatuses.accepted) {
            return (
                <View style={styles.state}>
                    <View style={styles.meta}>
                        <Text style={styles.label}>Arrived at Location:</Text>
                    </View>
                    <Button
                        onPress={this.acceptRequest.bind(this, currentOrder)}
                        title="ARRIVED!"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            );
        }
    }

    renderArrived = () => {
        const { currentOrder, state } = this.props;
        if (state === orderStatuses.arrived) {
            return (
                <View style={styles.state}>
                    <View style={styles.meta}>
                        <Text style={styles.label}>Mark order complete:</Text>
                    </View>
                    <Button
                        onPress={this.acceptRequest.bind(this, currentOrder)}
                        title="COMPLETE ORDER"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            );
        }
    }

    renderOrderState = () => {
        const {
            currentOrder
        } = this.props;
        if (currentOrder) {
            return (
                <View>
                    {this.renderAccepted()}
                    {this.renderArrived()}
                </View>
            );
        }
    }

    render() {
        const {
            pending,
            potentialOrders,
            currentOrder
        } = this.props;
        return (
            <View style={styles.container}>
                {!potentialOrders || !currentOrder ?
                    <View style={styles.container}>
                        <Text style={styles.searching}>Scanning the sky for beacons...</Text>
                        <ActivityIndicator
                            size="large"
                            color="#F5A623"
                        />
                    </View> :
                    <View style={styles.container}>
                        {pending ?
                            <ActivityIndicator
                                size="large"
                                color="#F5A623"
                            /> :
                            <View style={styles.container}>
                                {this.renderOrderRequests()}
                                {this.renderOrderState()}
                            </View>
                        }
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10
    },
    button: {
        backgroundColor: '#000',
        height: emY(3.75)
    },
    buttonText: {
        fontSize: emY(0.8125)
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profile: {
        alignItems: 'center',
        marginTop: emY(2.68)
    },
    loader: {
        height: emY(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: emY(1)
    },
    imageContainer: {
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.GREY_300,
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [0, -SIZE * 1] }, { scale: 1 }]
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [-SIZE / 2, -SIZE / 2] }, { scale: 1.4 }]
    },
    searching: {
        color: Color.GREY_600,
        fontSize: emY(1.4375),
        textAlign: 'center',
        marginBottom: emY(3)
    },
    spinner: {
        marginVertical: 30
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center'
    },
    label: {
        fontSize: 14,
        color: Color.GREY_600,
        marginRight: 11
    },
    labelText: {
        color: Color.GREY_600,
        fontSize: emY(1.0625),
        letterSpacing: 0.5
    },
    state: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 23,
        paddingVertical: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.625) },
                shadowOpacity: 0.5,
                shadowRadius: emY(1.5)
            },
            android: {
                elevation: 10
            }
        })
    },
});

const mapStateToProps = state => ({
    header: state.header,
    potentialOrders: state.orders.potentialOrders,
    pending: state.orders.pending,
    currentOrder: state.orders.currentOrder,
    status: state.orders.status,
    productsSatisfied: state.orders.productsSatisfied,
    hero: getHero(state)
});

const mapDispatchToProps = {
    fishOrdersRequest,
    dropdownAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryStatusScreen);
