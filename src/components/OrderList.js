// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import _ from 'lodash';

// Relative Imports
import OrderDetail from './OrderDetail';
import { emY } from '../utils/em';
import Color from '../constants/Color';

class OrderList extends Component {
    renderOrders() {
        let prevDeliveryType;
        return _.map(this.props.orders, order => {
            let renderMark;
            if (prevDeliveryType !== order.deliveryType) {
                renderMark = (
                    <View key={`${order.deliveryType}-${order.productCode}`}>
                        <View style={styles.headerItem}>
                            <Text style={styles.typeLabel}>Delivery Type: </Text>
                            <Text style={styles.valueLabel}>{order.deliveryType}</Text>
                        </View>
                        <OrderDetail
                            order={order}
                            onAddOrder={() => this.props.onAddOrder(order)}
                            onRemoveOrder={() => this.props.onRemoveOrder(order)}
                        />
                    </View>
                );
                prevDeliveryType = order.deliveryType;
            } else {
                renderMark = (
                    <View key={`${order.deliveryType}-${order.productCode}`}>
                        <OrderDetail
                            order={order}
                            onAddOrder={() => this.props.onAddOrder(order)}
                            onRemoveOrder={() => this.props.onRemoveOrder(order)}
                        />
                    </View>
                );
            }
            return renderMark;
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.renderOrders()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headerItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: emY(0.2),
        backgroundColor: Color.GREY_100
    },
    typeLabel: {
        fontSize: emY(1),
        color: Color.GREY_600
    },
    valueLabel: {
        fontSize: emY(1),
        color: Color.YELLOW_600
    }
});

export default OrderList;
