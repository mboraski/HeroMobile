// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Linking, Platform } from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import { getOrders } from '../selectors/contractorSelectors';
import { changeOrderStatus } from '../actions/contractorActions';
import BackButton from '../components/BackButton';
import OrderInfo from '../components/OrderInfo';
import Style from '../constants/Style';

class OrderScreen extends Component {
    changeOrderStatusEnRoute = () => {
        const { orderId } = this.props;
        console.log('orderId: ', orderId);

        this.props.changeOrderStatus('en_route', orderId);
    };

    changeOrderStatusArrived = () => {
        const { orderId } = this.props;

        this.props.changeOrderStatus('arrived', orderId);
    };

    changeOrderStatusCompleted = () => {
        const { orderId } = this.props;

        this.props.changeOrderStatus('delivered', orderId);
    };

    specifyOrder = () => {
        const { orders, orderId } = this.props;
        // TODO: log error if no match;
        return orders[orderId];
    };

    askForDirections = () => {
        const { address } = this.props;
        const encodedAddress = encodeURIComponent(address);
        if (Platform.OS === 'ios') {
            Linking.openURL(`http://maps.apple.com/?daddr=${encodedAddress}`);
        } else {
            Linking.openURL(`http://maps.google.com/?daddr=${encodedAddress}`);
        }
        return;
    };

    render() {
        const order = this.specifyOrder();
        const customerInfo = order.customerInfo;

        return (
            <ScrollView style={styles.container}>
                <OrderInfo
                    products={order.cart}
                    notes={customerInfo.notes}
                    firstName={customerInfo.firstName}
                    lastName={customerInfo.lastName}
                />
                <Button
                    title={'View Route'}
                    buttonStyle={styles.button}
                    onPress={this.askForDirections}
                />
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
