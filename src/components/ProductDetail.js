// Third Part Imports
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const ICON_SIZE = 35;
const ProductDetail = ({
    consumed,
    quantity,
    product,
    inCart,
    image,
    onPress,
    style
}) => {
    const { productName, price } = product;
    const formattedPrice = `${Number.parseFloat(price / 100).toFixed(2)}`;

    const limitReached = () => {};
    const onClickHandler = () => {
        if (consumed) {
            limitReached();
        } else {
            onPress(product);
        }
    };

    return (
        <TouchableOpacity
            onPress={onClickHandler}
            style={[Style.shadow, styles.container, style]}
        >
            <View
                style={[styles.quantityRow, inCart && styles.quantityRowAdded]}
            >
                {inCart ? (
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantity}>{quantity}</Text>
                    </View>
                ) : null}
                {consumed ? (
                    <MaterialCommunityIcons
                        name={'circle'}
                        size={ICON_SIZE}
                        style={[styles.icon, inCart && styles.iconAdded]}
                    />
                ) : (
                    <Foundation
                        name={'plus'}
                        size={ICON_SIZE}
                        style={[styles.icon, inCart && styles.iconAdded]}
                    />
                )}
            </View>
            <Image
                style={styles.image}
                source={{ uri: image }}
                resizeMode="contain"
            />
            <View style={styles.meta}>
                <Text style={[styles.metaItem, styles.title]}>
                    {productName}
                </Text>
                <Text style={[styles.metaItem, styles.price]}>
                    ${formattedPrice}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 11
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    quantityRowAdded: {
        justifyContent: 'space-between'
    },
    quantityContainer: {
        backgroundColor: Color.GREEN_500,
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 13,
        paddingVertical: emY(0.5)
    },
    quantity: {
        fontSize: emY(1),
        color: '#fff'
    },
    icon: {
        color: Color.GREY_200
    },
    iconAdded: {
        color: Color.GREEN_500
    },
    image: {
        height: 140,
        width: '100%'
    },
    meta: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    metaItem: {
        fontSize: 16,
        margin: 4
    },
    title: {},
    price: {
        fontWeight: 'bold',
        color: Color.BLUE_500
    },
    discountPriceContainer: {
        marginRight: 12,
        backgroundColor: Color.BLUE_500,
        borderRadius: 50,
        overflow: 'hidden'
    },
    discountPrice: {
        marginHorizontal: 12,
        marginVertical: emY(0.375),
        color: '#fff'
    },
    regularPrice: {
        color: Color.GREY_300,
        textDecorationLine: 'line-through'
    }
});

export default ProductDetail;
