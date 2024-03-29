// Third Part Imports
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';

const ICON_CONTAINER_SIZE = emY(2.1875);
const ICON_SIZE = emY(0.75);

const OrderDetail = props => {
    const { onAddOrder, onRemoveOrder, order, image, displayOnly } = props;
    const { productName, price, quantityTaken } = order;
    const formattedPrice = `${Number.parseFloat(price).toFixed(2)}`;
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: image }}
                resizeMode="contain"
            />
            {displayOnly ? (
                <View style={styles.productInfo}>
                    <Text style={styles.quantityInfo}>{quantityTaken}</Text>
                    <Text style={styles.productNameInfo} numberOfLines={2}>
                        {productName}
                    </Text>
                </View>
            ) : (
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>
                        {productName}
                    </Text>
                    <View style={styles.quantityContainer}>
                        <Icon
                            name="remove"
                            size={ICON_SIZE}
                            containerStyle={styles.iconContainer}
                            iconStyle={styles.icon}
                            onPress={onRemoveOrder}
                        />
                        <Text style={styles.quantity}>{quantityTaken}</Text>
                        <Icon
                            name="add"
                            size={ICON_SIZE}
                            containerStyle={styles.iconContainer}
                            iconStyle={styles.icon}
                            onPress={onAddOrder}
                        />
                    </View>
                </View>
            )}
            {!displayOnly && (
                <View style={styles.actions}>
                    <Text style={styles.price}>${formattedPrice}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: emY(0.8125),
        paddingVertical: emY(0.875),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_300
    },
    content: { flex: 1 },
    image: {
        width: 60,
        height: emY(3.4375),
        marginRight: 5,
        alignSelf: 'center'
    },
    title: {
        fontSize: emY(0.75),
        flex: 1,
        marginBottom: emY(0.5)
    },
    productInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },
    productNameInfo: {
        fontSize: emY(0.9),
        width: '100%',
        overflow: 'hidden'
    },
    quantityInfo: {
        width: 30
    },
    price: {
        fontSize: emY(0.75),
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
        width: 30
    }
});

export default OrderDetail;
