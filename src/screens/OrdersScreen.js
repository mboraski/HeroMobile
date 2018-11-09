// 3rd Party Libraries
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import map from 'lodash.map';

// Relative Imports
import MenuAndBackButton from '../components/MenuAndBackButton';
import Order from '../components/Order';
import SectionTitle from '../components/SectionTitle';

// import { reset } from '../actions/navigationActions';
import { listenToOrders, unListenToOrders } from '../actions/contractorActions';
import { getOrders, getPending } from '../selectors/contractorSelectors';
import { emY } from '../utils/em';

import Color from '../constants/Color';
import Style from '../constants/Style';

class OrdersScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Payment Method',
            headerLeft: <MenuAndBackButton navigation={navigation} />,
            headerStyle: Style.header,
            headerTitleStyle: Style.headerTitle
        };
    };

    componentDidMount() {
        this.props.listenToOrders();
    }

    componentWillUnmount() {
        this.props.unListenToOrders();
    }

    selectOrder = orderId => {
        this.props.navigation.navigate('order', { orderId });
    };

    renderOrderSummary = (order, index) => {
        if (order) {
            const { firstName, lastName } = order.consumerInfo;
            const onPress = () => this.selectOrder(index);
            return (
                <Order
                    key={index}
                    firstName={firstName}
                    lastName={lastName}
                    onPress={onPress}
                />
            );
        }
    };

    render() {
        const { pending, orders } = this.props;

        return (
            <ScrollView style={styles.container} keyboardDismissMode="on-drag">
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="position"
                >
                    {pending && (
                        <View style={styles.overlay}>
                            <ActivityIndicator
                                animating={pending}
                                size="large"
                                color="#f5a623"
                            />
                        </View>
                    )}
                    <SectionTitle title="MY ORDERS" />
                    {orders && map(orders, this.renderOrderSummary)}
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    formSection: {
        fontSize: emY(0.8125),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(2.1875),
        paddingBottom: emY(1)
    },
    signUpAddPaymentMethodText: {
        fontFamily: 'goodtimes'
    }
});

const mapStateToProps = state => ({
    orders: getOrders(state),
    pending: getPending(state)
});

const mapDispatchToProps = {
    listenToOrders,
    unListenToOrders
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersScreen);
