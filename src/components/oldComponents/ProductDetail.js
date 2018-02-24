// Third Part Imports
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

// Relative Imports
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const ProductDetail = props => {
    const { title, thumbnail_image, price, added } = props.product;
    const callAddToCart = props.callAddToCart;

    return (
        <View style={[Style.shadow, styles.container, props.style]}>
            <View style={styles.iconContainer}>
                <Icon
                    onPress={callAddToCart}
                    type="foundation"
                    name="plus"
                    size={35}
                    iconStyle={[styles.icon, added && styles.iconAdded]}
                />
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: thumbnail_image }} />
            </View>
            <View style={styles.meta}>
                <Text style={[styles.metaItem, styles.title]}>
                    {title}
                </Text>
                <Text style={[styles.metaItem, styles.price]}>
                    {price}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: emY(0.9375),
        borderRadius: 11
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: emY(1.125)
    },
    icon: {
        color: Color.GREY_200
    },
    iconAdded: {
        color: Color.BLUE_500
    },
    imageContainer: {
        marginBottom: emY(2.1875)
    },
    image: {
        minHeight: emY(6.25)
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
