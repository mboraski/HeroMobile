// Third Part Imports
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';

// Relative Imports
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

import productImage0 from '../assets/product-0.png';
import productImage1 from '../assets/product-1.png';
import productImage2 from '../assets/product-2.png';
import productImage3 from '../assets/product-3.png';

const images = [productImage0, productImage1, productImage2, productImage3];

const ICON_SIZE = 35;

const ProductDetail = ({ product, onPress, quantity, style }) => {
    const { title, thumbnail_image, price } = product;
    const temp_thumbnail_image = images[product.productCode % 4];
    const added = quantity > 0;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[Style.shadow, styles.container, style]}
        >
            <View
                style={[styles.quantityRow, added && styles.quantityRowAdded]}
            >
                {added ? (
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantity}>{quantity}</Text>
                    </View>
                ) : null}
                <Foundation
                    name="plus"
                    size={ICON_SIZE}
                    style={[styles.icon, added && styles.iconAdded]}
                />
            </View>
            <Image
                style={styles.image}
                source={temp_thumbnail_image}
                resizeMode="contain"
            />
            <View style={styles.meta}>
                <Text style={[styles.metaItem, styles.title]}>{title}</Text>
                <Text style={[styles.metaItem, styles.price]}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: emY(0.9375),
        borderRadius: 11
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: emY(1.125)
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
        height: emY(6.2),
        width: '100%',
        marginBottom: emY(2.2)
    },
    meta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    metaItem: {
        fontSize: emY(1),
        marginRight: 12,
        marginBottom: emY(0.375)
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
