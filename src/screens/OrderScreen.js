// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Linking, Platform, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { firebaseAuth } from '../../firebase';

// Relative Imports
import { getOrders } from '../selectors/contractorSelectors';
import { changeOrderStatus } from '../actions/contractorActions';
import { emY } from '../utils/em';
import Color from '../constants/Color';
import BackButton from '../components/BackButton';
import OrderCartInfo from '../components/OrderCartInfo';
import Style from '../constants/Style';

class OrderScreen extends Component {
    state = {
        cart: {},
        notes: '',
        region: {
            latitude: '',
            longitude: ''
        },
        firstName: 'first name',
        lastName: 'last name',
        contractorStatus: ''
    };

    componentWillMount() {
        const { orders, orderId } = this.props;
        const order = this.specifyOrder(orders, orderId);
        if (order) {
            this.setCustomerInfo(order);
            this.setCart(order);
            this.setStatus(order);
        }
    }

    componentWillReceiveProps(nextProps) {
        const newOrders = nextProps.orders || this.props.orders;
        const newOrderId = nextProps.orderId || this.props.orderId;
        const order = this.specifyOrder(newOrders, newOrderId);
        if (order) {
            this.setCustomerInfo(order);
            this.setCart(order);
            this.setStatus(order);
        }
    }

    setCustomerInfo = order => {
        const { firstName, lastName, region, notes } = order.consumerInfo;
        return this.setState({
            firstName,
            lastName,
            region,
            notes
        });
    };

    setCart = order => {
        const { cart } = order;
        return this.setState({
            cart
        });
    };

    setStatus = order => {
        const uid = firebaseAuth.currentUser.uid;
        const { fulfillment } = order;
        const actual = fulfillment.actualFulfillment;
        const full = actual.full;
        const contractorDetails = full[uid] || null;
        if (contractorDetails) {
            this.setState({
                contractorStatus: contractorDetails.status
            });
        }
        return;
    };

    changeOrderStatusEnRoute = () => {
        const { orderId } = this.props;
        console.log('orderId: ', orderId);

        return this.props.changeOrderStatus('en_route', orderId);
    };

    changeOrderStatusArrived = () => {
        const { orderId } = this.props;

        return this.props.changeOrderStatus('arrived', orderId);
    };

    changeOrderStatusCompleted = () => {
        const { orderId } = this.props;

        return this.props.changeOrderStatus('delivered', orderId);
    };

    specifyOrder = (orders, orderId) => {
        // TODO: log error if no match;
        return orders[orderId];
    };

    askForDirections = () => {
        const { region, firstName, lastName } = this.state;
        const lat = region.latitude;
        const lon = region.longitude;
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q='
        });
        const latLng = `${lat},${lon}`;
        const label = `${firstName} ${lastName}`;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
        // const { address } = this.props;
        // const encodedAddress = encodeURIComponent(address);
        // if (Platform.OS === 'ios') {
        //     Linking.openURL(`http://maps.apple.com/?ll=37.484847,-122.148386`);
        // } else {
        //     Linking.openURL(`http://maps.google.com/?daddr=${encodedAddress}`);
        // }
        return;
    };

    render() {
        const {
            cart,
            firstName,
            lastName,
            notes,
            contractorStatus
        } = this.state;

        return (
            <ScrollView style={styles.container}>
                <OrderCartInfo products={cart} />
                <Button
                    title={'View Route'}
                    buttonStyle={styles.button}
                    onPress={this.askForDirections}
                />
                <Text style={styles.titleLabel}>
                    {'Consumer Name: '}
                    <Text
                        style={styles.valueLabel}
                    >{`${firstName} ${lastName}`}</Text>
                </Text>
                <Text style={styles.titleLabel}>
                    {'Order Status: '}
                    <Text style={styles.valueLabel}>{contractorStatus}</Text>
                </Text>
                <Text style={styles.titleLabel}>
                    {'Order Notes: '}
                    <Text style={styles.valueLabel}>{notes}</Text>
                </Text>
                <Button
                    title={'En Route'}
                    buttonStyle={styles.button}
                    onPress={this.changeOrderStatusEnRoute}
                />
                <Button
                    title={'Arrived'}
                    buttonStyle={styles.button}
                    onPress={this.changeOrderStatusArrived}
                />
                <Button
                    title={'Completed'}
                    buttonStyle={styles.button}
                    onPress={this.changeOrderStatusCompleted}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    titleLabel: {
        fontSize: emY(1),
        color: Color.GREY_600
    },
    valueLabel: {
        fontSize: emY(1),
        color: Color.YELLOW_600
    }
});

const mapStateToProps = (state, props) => {
    const id =
        props.navigation.state.params && props.navigation.state.params.orderId;
    return {
        orderId: id,
        orders: getOrders(state)
    };
};

const mapDispatchToProps = {
    changeOrderStatus
};

OrderScreen.navigationOptions = ({ navigation }) => ({
    title: 'Order Details',
    headerLeft: <BackButton onPress={() => navigation.pop()} />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderScreen);
