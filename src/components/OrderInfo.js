// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import map from 'lodash.map';

// Relative Imports
import Text from './Text';
import { emY } from '../utils/em';
import Color from '../constants/Color';

class OrderInfo extends Component {
    renderProducts() {
        const { products } = this.props;
        return map(products, product => {
            return (
                <View key={`instant-${product.productName}`}>
                    <Text style={styles.typeLabel}>{product.productName}</Text>
                    <Text style={styles.valueLabel}>
                        {product.quantityTaken}
                    </Text>
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerItem}>
                    <Text style={styles.typeLabel}>Delivery Type: </Text>
                    <Text style={styles.valueLabel}>{'Instant'}</Text>
                </View>
                {this.renderProducts()}
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

export default OrderInfo;
