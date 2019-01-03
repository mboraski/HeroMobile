// Third Party Imports
import React, { Component } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import map from 'lodash.map';

// Relative Imports
import ProductList from '../components/ProductList';
import Text from '../components/Text';

import Color from '../constants/Color';
import { addToCart } from '../actions/cartActions';
import { selectCategory } from '../actions/productActions';
import { dropdownAlert } from '../actions/uiActions';

import {
    getCartTotalQuantity,
    getCartInstantProducts
} from '../selectors/cartSelectors';
import {
    getCategory,
    getItemCountUp,
    getItemCountDown,
    getProductsPending,
    getProductsByCategory,
    getCategories,
    getNumberOfProducts,
    getProductImages,
    getHeader
} from '../selectors/productSelectors';

import AuthScreenBackground from '../assets/AuthScreenBackground.jpg';
import { emY } from '../utils/em';

import HomeHeaderContainer from '../containers/HomeHeaderContainer';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

class ProductsScreen extends Component {
    componentWillReceiveProps(nextProps) {
        if (!this.props.itemCountUp && nextProps.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (!this.props.itemCountDown && nextProps.itemCountDown) {
            this.props.dropdownAlert(
                true,
                'Some products are no longer available'
            );
        }
    }

    callAddToCart = product => {
        this.props.addToCart(product);
    };

    formatCategory = category => (category ? category.toUpperCase() : '');

    goToCheckout = () => {
        this.props.navigation.navigate('checkout');
    };

    renderCategories = () => {
        const selectedCategory = this.props.category;
        return map(this.props.categories, (category, i) => {
            const selectedFilter =
                category.toLowerCase() === selectedCategory.toLowerCase();
            const filterButtonSelected = selectedFilter
                ? styles.filterButtonSelected
                : null;
            const filterButtonTextSelected = selectedFilter
                ? styles.filterButtonTextSelected
                : null;
            const onPress = () => this.props.selectFilter(category);
            return (
                <TouchableOpacity
                    key={i}
                    style={[styles.filterButton, filterButtonSelected]}
                    onPress={onPress}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            filterButtonTextSelected
                        ]}
                    >
                        {category}
                    </Text>
                </TouchableOpacity>
            );
        });
    };

    render() {
        const {
            cartQuantity,
            productPending,
            productsShown,
            category,
            numberOfProducts,
            productImages
        } = this.props;
        return (
            <View style={styles.container}>
                {cartQuantity > 0 ? (
                    <TouchableOpacity
                        style={styles.checkout}
                        onPress={this.goToCheckout}
                    >
                        <Text style={styles.imageTitle}>Go to Checkout</Text>
                        <View style={styles.checkoutIconContainer}>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                color="#fff"
                                size={50}
                                style={styles.checkoutIcon}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <ImageBackground
                        source={AuthScreenBackground}
                        style={styles.image}
                    >
                        <View
                            style={[StyleSheet.absoluteFill, styles.imageTint]}
                        />
                        <View>
                            <Text style={styles.imageTitle}>
                                {this.formatCategory(category)}
                            </Text>
                            <Text style={styles.imageMeta}>
                                {numberOfProducts} items
                            </Text>
                        </View>
                    </ImageBackground>
                )}
                {productPending ? (
                    <View style={styles.overlay}>
                        <ActivityIndicator
                            animating={productPending}
                            size="large"
                            color="#f5a623"
                        />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <ScrollView
                            horizontal
                            contentContainerStyle={styles.filtersContent}
                        >
                            {this.renderCategories()}
                        </ScrollView>
                        {productsShown ? (
                            <ProductList
                                products={productsShown}
                                productImages={productImages}
                                callAddToCart={this.callAddToCart}
                            />
                        ) : (
                            <View style={styles.container}>
                                <Text>
                                    {'Set location on map screen for products'}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxWidth: WINDOW_WIDTH,
        maxHeight: WINDOW_HEIGHT
    },
    image: {
        height: WINDOW_HEIGHT / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageTint: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1.875),
        textAlign: 'center'
    },
    imageMeta: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1),
        textAlign: 'center'
    },
    checkout: {
        height: WINDOW_HEIGHT / 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.GREEN_500
    },
    checkoutIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 50,
        justifyContent: 'center'
    },
    checkoutIcon: {
        backgroundColor: 'transparent'
    },
    filtersContent: {
        maxHeight: emY(2.5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 5
    },
    filterButton: {
        minWidth: 120,
        height: emY(2),
        borderColor: Color.GREY_400,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 25,
        marginRight: 6,
        justifyContent: 'center'
    },
    filterButtonSelected: {
        borderColor: Color.GREY_300,
        backgroundColor: Color.GREY_300
    },
    filterButtonText: {
        color: Color.GREY_400,
        fontSize: emY(1.125),
        textAlign: 'center'
    },
    filterButtonTextSelected: {
        color: '#fff'
    },
    overlay: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
});

ProductsScreen.navigationOptions = {
    header: <HomeHeaderContainer />
};

const mapStateToProps = state => ({
    cart: getCartInstantProducts(state),
    cartQuantity: getCartTotalQuantity(state),
    itemCountUp: getItemCountUp(state),
    itemCountDown: getItemCountDown(state),
    productPending: getProductsPending(state),
    productsShown: getProductsByCategory(state),
    category: getCategory(state),
    categories: getCategories(state),
    numberOfProducts: getNumberOfProducts(state),
    productImages: getProductImages(state),
    header: getHeader(state)
});

// TODO: Change formatting of mapDispatchToProps?
const mapDispatchToProps = dispatch => ({
    selectFilter: category => dispatch(selectCategory(category)),
    addToCart: productInfo => dispatch(addToCart(productInfo)),
    dropdownAlert: (visible, message) =>
        dispatch(dropdownAlert(visible, message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsScreen);
