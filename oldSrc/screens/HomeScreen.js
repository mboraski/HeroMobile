// Third Party Imports
import React, { Component } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
// import firebase from '../firebase';

// Relative Imports
import ProductList from '../components/ProductList';
// import MenuButton from '../components/MenuButton';
// import CartButton from '../components/CartButton';
// import SearchBar from '../components/SearchBar';
import Text from '../components/Text';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
// import Style from '../constants/Style';
import { addToCart } from '../actions/cartActions';
import {
    selectCategory,
    fetchProductsRequest
} from '../actions/productActions';
import { dropdownAlert } from '../actions/uiActions';
import getProductsState from '../selectors/productSelectors';
import { emY } from '../utils/em';
import AuthScreenBackground from '../assets/AuthScreenBackground.jpg';
import HomeHeader from '../containers/HomeHeader';

class HomeScreen extends Component {
    componentDidMount() {
        this.props.fetchProductsRequest();
        if (this.props.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (this.props.itemCountDown) {
            this.props.dropdownAlert(
                true,
                'Some products are no longer available'
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
        if (!this.props.cart && nextProps.cart) {
            this.props.fetchProductsRequest();
        }
        if (!this.props.itemCountUp && nextProps.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (!this.props.itemCountDown && nextProps.itemCountDown) {
            this.props.dropdownAlert(
                true,
                'Some products are no longer available'
            );
        } else {
            this.props.dropdownAlert(false, '');
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
        return _.map(this.props.categories, (category, i) => {
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
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    />
                ) : (
                    <View style={styles.container}>
                        <ScrollView
                            horizontal
                            style={styles.filters}
                            contentContainerStyle={styles.filtersContent}
                        >
                            {this.renderCategories()}
                        </ScrollView>
                        {productsShown && (
                            <ProductList
                                products={productsShown}
                                productImages={productImages}
                                callAddToCart={this.callAddToCart}
                            />
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
        backgroundColor: '#fff'
    },
    image: {
        height: Dimensions.window.height / 5,
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
        height: Dimensions.window.height / 5,
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
    filters: {
        ...Platform.select({
            ios: {
                height: 70,
                maxHeight: 70
            },
            android: {
                height: 70,
                maxHeight: 70
            }
        })
    },
    filtersContent: {
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 70
    },
    filterButton: {
        minWidth: 120,
        height: emY(2.5),
        borderColor: Color.GREY_400,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 50,
        paddingVertical: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterButtonSelected: {
        borderColor: Color.GREY_300,
        backgroundColor: Color.GREY_300
    },
    filterButtonText: {
        color: Color.GREY_400,
        fontSize: emY(1.125)
    },
    filterButtonTextSelected: {
        color: '#fff'
    }
});

HomeScreen.navigationOptions = {
    header: <HomeHeader />
};

// HomeScreen.navigationOptions = ({ navigation }) => ({
//     title: 'Hasty Logo',
//     headerLeft: <MenuButton />,
//     headerTitle: <SearchBar />,
//     headerRight: <CartButton navigation={navigation} />,
//     headerStyle: Style.headerLarge,
//     headerTitleStyle: Style.headerTitle
// });

const mapStateToProps = state => getProductsState(state);

const mapDispatchToProps = dispatch => ({
    selectFilter: category => dispatch(selectCategory(category)),
    addToCart: productInfo => dispatch(addToCart(productInfo)),
    fetchProductsRequest: () => dispatch(fetchProductsRequest()),
    dropdownAlert: (visible, message) =>
        dispatch(dropdownAlert(visible, message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
