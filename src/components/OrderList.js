// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import _ from 'lodash';

// Relative Imports
import OrderDetail from './OrderDetail';
import Text from './Text';
import { emY } from '../utils/em';
import Color from '../constants/Color';

class OrderList extends Component {
    renderOrders() {
        const {
            orders,
            orderImages,
            onAddOrder,
            onRemoveOrder,
            displayOnly
        } = this.props;
        let prevDeliveryType;
        return _.map(orders, order => {
            const image = orderImages[order.productName] || '';
            let renderMark;
            if (prevDeliveryType !== 'instant') {
                renderMark = (
                    <View key={`instant-${order.productName}`}>
                        <View style={styles.headerItem}>
                            <Text style={styles.typeLabel}>Delivery Type: </Text>
                            <Text style={styles.valueLabel}>{'Instant'}</Text>
                        </View>
                        <OrderDetail
                            displayOnly={displayOnly}
                            order={order}
                            image={image}
                            onAddOrder={() => onAddOrder(order)}
                            onRemoveOrder={() => onRemoveOrder(order)}
                        />
                    </View>
                );
                prevDeliveryType = 'instant';
            } else {
                renderMark = (
                    <View key={`instant-${order.productName}`}>
                        <OrderDetail
                            displayOnly={displayOnly}
                            order={order}
                            image={image}
                            onAddOrder={() => onAddOrder(order)}
                            onRemoveOrder={() => onRemoveOrder(order)}
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
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
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
