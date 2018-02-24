// Third Party Imports
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';

// Relative Imports
import ProductList from '../components/ProductList';
import MenuButton from '../components/MenuButton';
import CartButton from '../components/CartButton';
import SearchBar from '../components/SearchBar';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import Style from '../constants/Style';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { selectDeliveryType } from '../actions/productActions';
import { getProductsByDeliveryType } from '../selectors/productSelectors';
import { emY } from '../utils/em';

const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };
const FILTERS = [{ name: 'For You', id: '1' }, { name: 'Food', id: '2' }];

export class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Hasty Logo',
        headerLeft: <MenuButton />,
        headerTitle: <SearchBar />,
        headerRight: <CartButton />,
        headerStyle: Style.headerLarge,
        headerTitleStyle: Style.headerTitle
    };

    state = { filter: FILTERS[0] };

    componentWillReceiveProps(nextProps) {
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
    }

    onPressFilter(filter) {
        console.log(filter);
    }

    callAddToCart = product => {
        this.props.addToCart(product);
    };

    callRemoveFromCart = product => {
        this.props.removeFromCart(product);
    };

    goToCheckout = () => {
        this.props.navigation.navigate('checkout');
    };

    renderFilter = filter => {
        const selectedFilter = this.props.deliveryType === filter.id;
        const filterButtonSelected = selectedFilter ? styles.filterButtonSelected : null;
        const filterButtonTextSelected = selectedFilter ? styles.filterButtonTextSelected : null;
        const onPress = () => this.props.selectFilter(filter.id);
        return (
            <TouchableOpacity
                key={filter.id}
                style={[styles.filterButton, filterButtonSelected]}
                onPress={onPress}
            >
                <Text style={[styles.filterButtonText, filterButtonTextSelected]}>
                    {filter.name}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        const { cart, products } = this.props;
        return (
            <View style={styles.container}>
                {cart.totalQuantity > 0 ? (
                    <TouchableOpacity style={styles.checkout} onPress={this.goToCheckout}>
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
                    <Image source={SOURCE} style={styles.image}>
                        <View style={[StyleSheet.absoluteFill, styles.imageTint]} />
                        <View>
                            <Text style={styles.imageTitle}>Recommended</Text>
                            <Text style={styles.imageMeta}>215 items</Text>
                        </View>
                    </Image>
                )}
                <ScrollView
                    horizontal
                    style={styles.filters}
                    contentContainerStyle={styles.filtersContent}
                >
                    {FILTERS.map(this.renderFilter)}
                </ScrollView>
                <ProductList
                    cart={cart}
                    products={products}
                    callAddToCart={this.callAddToCart}
                    callRemoveFromCart={this.callRemoveFromCart}
                />
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
        height: Dimensions.window.height / 4,
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
        height: Dimensions.window.height / 4,
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
                height: emY(6.25)
            },
            android: {
                height: emY(6.25) + 30
            }
        })
    },
    filtersContent: {
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterButton: {
        minWidth: 120,
        height: emY(2.5),
        borderColor: Color.GREY_400,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 50,
        paddingVertical: emY(0.75),
        marginRight: 15,
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

HomeScreen.navigationOptions = ({ navigation }) => ({
    title: 'Hasty Logo',
    headerLeft: <MenuButton />,
    headerTitle: <SearchBar />,
    headerRight: <CartButton navigation={navigation} />,
    headerStyle: Style.headerLarge,
    headerTitleStyle: Style.headerTitle
});

const mapStateToProps = state => ({
    cart: state.cart,
    products: getProductsByDeliveryType(state),
    deliveryType: state.product.deliveryType,
    header: state.header,
});

const mapDispatchToProps = dispatch => ({
    selectFilter: filter => dispatch(selectDeliveryType(filter)),
    addToCart: product => dispatch(addToCart(product)),
    removeFromCart: product => dispatch(removeFromCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
