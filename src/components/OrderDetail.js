// Third Part Imports
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// Relative Imports
import Color from '../constants/Color';
import { emY } from '../utils/em';

import productImage0 from '../assets/product-0.png';
import productImage1 from '../assets/product-1.png';
import productImage2 from '../assets/product-2.png';
import productImage3 from '../assets/product-3.png';

const images = [
    productImage0,
    productImage1,
    productImage2,
    productImage3
];

const ICON_CONTAINER_SIZE = emY(2.1875);
const ICON_SIZE = emY(0.75);

const OrderDetail = props => {
    const { onAddOrder, onRemoveOrder } = props;
    const { title, price, deliveryType, thumbnail_image, quantity } = props.order;
    const temp_thumbnail_image = images[props.order.productCode % 4];
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={temp_thumbnail_image} resizeMode="contain" />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.deliveryType}>
                    <Text style={styles.deliveryTypeLabel}>Delivery Type:</Text>
                    <Text style={styles.deliveryTypeValue}>{deliveryType}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.changeDeliveryTypeText}>Change delivery type</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actions}>
                <Text style={styles.price}>${price}</Text>
                <View style={styles.quantityContainer}>
                    <Icon
                        name="remove"
                        size={ICON_SIZE}
                        containerStyle={styles.iconContainer}
                        iconStyle={styles.icon}
                        onPress={onRemoveOrder}
                    />
                    <Text style={styles.quantity}>{quantity}</Text>
                    <Icon
                        name="add"
                        size={ICON_SIZE}
                        containerStyle={styles.iconContainer}
                        iconStyle={styles.icon}
                        onPress={onAddOrder}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: emY(0.8125),
        paddingVertical: emY(0.875),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_300
    },
    content: { flex: 1 },
    actions: {},
    image: {
        width: 75,
        height: emY(3.4375),
        marginRight: 15,
        alignSelf: 'center'
    },
    title: {
        fontSize: emY(1.25),
        flex: 1,
        marginBottom: emY(0.5)
    },
    price: {
        fontSize: emY(1.25),
        textAlign: 'right',
        marginRight: 10,
        marginBottom: emY(1.375)
    },
    deliveryType: {
        flexDirection: 'row'
    },
    deliveryTypeLabel: {
        fontSize: emY(1),
        color: Color.GREY_600,
        marginRight: 8,
        marginBottom: emY(0.375)
    },
    deliveryTypeValue: {
        fontSize: emY(1)
    },
    changeDeliveryTypeText: {
        color: Color.BLUE_500,
        fontSize: emY(0.875)
    },
    iconContainer: {
        backgroundColor: Color.GREY_200,
        borderRadius: ICON_CONTAINER_SIZE / 2,
        height: ICON_CONTAINER_SIZE,
        width: ICON_CONTAINER_SIZE
    },
    icon: {},
    quantityContainer: {
        flexDirection: 'row'
    },
    quantity: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 40
    }
});

export default OrderDetail;
