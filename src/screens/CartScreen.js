// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
import OopsPopup from '../components/OopsPopup';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import { getAvailableCartOrders } from '../selectors/cartSelectors';
import * as actions from '../actions/cartActions';

export class CartScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Cart',
        headerLeft: <BackButton onPress={() => navigation.goBack()} />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    });

    state = {
        removeOrderPopupVisible: false
    };

    handleRemoveOrder = order => {
        if (order.quantity === 1) {
            this.setState({ removeOrderPopupVisible: true, orderToRemove: order });
        } else {
            this.props.removeFromCart(order);
        }
    };

    removeOrderConfirmed = confirmed => {
        if (confirmed) {
            this.props.removeFromCart(this.state.orderToRemove);
            this.setState({ removeOrderPopupVisible: false, orderToRemove: null });
        }
    };

    render() {
        const { orders, addToCart, totalQuantity, totalCost } = this.props;
        const { removeOrderPopupVisible } = this.state;
        return (
            <View style={styles.container}>
                <OrderList
                    orders={orders}
                    onAddOrder={addToCart}
                    onRemoveOrder={this.handleRemoveOrder}
                />
                <View style={styles.cart}>
                    <View style={styles.meta}>
                        <Text style={styles.label}>Order Total:</Text>
                        <Text style={styles.quantity}>
                            {totalQuantity} item{totalQuantity > 1 ? 's' : ''}
                        </Text>
                        <Text style={styles.cost}>${totalCost}</Text>
                    </View>
                    <Button
                        title="Go to checkout"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
                <OopsPopup
                    openModal={removeOrderPopupVisible}
                    closeModal={this.removeOrderConfirmed}
                    message="Are you sure you want to remove this product from your cart?"
                    showIcon={false}
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
    cart: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 27,
        paddingTop: emY(1.6875),
        paddingBottom: emY(1),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.625) },
                shadowOpacity: 0.5,
                shadowRadius: emY(1.5)
            },
            android: {
                elevation: 10
            }
        })
    },
    meta: {
        flexDirection: 'row',
        marginBottom: emY(1.375),
        alignItems: 'center'
    },
    label: {
        fontSize: emY(1),
        color: Color.GREY_600,
        marginRight: 11
    },
    quantity: {
        fontSize: emY(1),
        flex: 1
    },
    cost: {
        fontSize: emY(1.25)
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(0.875)
    },
    buttonText: {
        fontSize: emY(0.8125)
    }
});

const mapStateToProps = state => ({
    cart: state.cart,
    orders: getAvailableCartOrders(state),
    totalCost: state.cart.totalCost,
    totalQuantity: state.cart.totalQuantity
});

const mapDispatchToProps = {
    addToCart: actions.addToCart,
    removeFromCart: actions.removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
