// 3rd Party Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Platform,
    Animated,
    ActivityIndicator,
    Dimensions,
    Alert,
    Image
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import map from 'lodash.map';
import { MaterialIcons } from '@expo/vector-icons';

// Relative Imports
import DropDown from '../components/DropDown';
import PaymentDropDownItem from '../components/PaymentDropDownItem';
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
import OopsPopup from '../components/OopsPopup';
import SuccessPopup from '../components/SuccessPopup';
import Text from '../components/Text';

import Color from '../constants/Color';
import Style from '../constants/Style';
import beaconIcon from '../assets/icons/beacon.png';

import { emY } from '../utils/em';

import { addToCart, removeFromCart } from '../actions/cartActions';
import { dropdownAlert } from '../actions/uiActions';
import { submitPayment, changePaymentMethod } from '../actions/paymentActions';

import {
    getCartOrders,
    getCartCostTotal,
    getCartTax,
    getCartServiceFee,
    getCartTotalQuantity,
    getCartPureTotal
} from '../selectors/cartSelectors';
import {
    getCards,
    getPaymentMethod,
    getPending,
    getStripeCustomerId
} from '../selectors/paymentSelectors';
import { getAddress, getRegion } from '../selectors/mapSelectors';
import { getProductImages } from '../selectors/productSelectors';
import {
    getNotes,
    getDeliveryFee,
    getDiscount
} from '../selectors/checkoutSelectors';
import {
    getEmail,
    getFirstName,
    getLastName
} from '../selectors/authSelectors';
import { getOrderId } from '../selectors/orderSelectors';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const REMOVE_ORDER_MESSAGE =
    'Are you sure you want to remove this product from your cart?';
const CHANGE_LOCATION_TITLE =
    'Are you sure you want to change your delivery location?';
const CHANGE_LOCATION_MESSAGE =
    'The available products/services at your new location may be different.';
const MAP_HEIGHT = emY(12);
const beaconEdgeLength = emY(6);

class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation, pending }) => ({
        title: 'Hasty',
        headerLeft: (
            <BackButton
                onPress={!pending ? () => navigation.pop() : () => {}}
            />
        ),
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: [Style.headerTitle, Style.headerTitleLogo]
    });

    state = {
        mapLoaded: false,
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        removeOrderPopupVisible: false,
        changeLocationPopupVisible: false,
        dropdownHeader: (
            <PaymentDropDownItem
                isHeaderItem
                onPress={this.goToPaymentMethodScreen}
                type={''}
                brand={'Card Missing'}
                last4={''}
            />
        )
    };

    componentWillMount() {
        const { paymentMethod } = this.props;
        if (paymentMethod && paymentMethod.card) {
            this.setState({
                dropdownHeader: (
                    <PaymentDropDownItem
                        isHeaderItem
                        onPress={() => this.dropDownRef.toggle()}
                        type={paymentMethod.card.brand}
                        brand={paymentMethod.card.brand}
                        last4={paymentMethod.card.last4}
                    />
                )
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.orderId && nextProps.orderId) {
            this.props.navigation.navigate('deliveryStatus');
        }
        if (!this.props.itemCountUp && nextProps.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (!this.props.itemCountDown && nextProps.itemCountDown) {
            this.props.dropdownAlert(
                true,
                'Some products are no longer available'
            );
        }
        if (nextProps.paymentMethod && nextProps.paymentMethod.card) {
            const paymentMethod = nextProps.paymentMethod;
            this.setState({
                dropdownHeader: (
                    <PaymentDropDownItem
                        isHeaderItem
                        onPress={() => this.dropDownRef.toggle()}
                        type={paymentMethod.card.brand}
                        brand={paymentMethod.card.brand}
                        last4={paymentMethod.card.last4}
                    />
                )
            });
        }
    }

    goToPaymentMethodScreen = () => {
        this.props.navigation.navigate('paymentMethod');
    };

    handleRemoveOrder = order => {
        if (order.quantityTaken === 1) {
            this.setState({
                removeOrderPopupVisible: true,
                orderToRemove: order
            });
        } else {
            this.props.removeFromCart(order);
        }
    };

    removeOrderConfirmed = confirmed => {
        if (confirmed) {
            this.props.removeFromCart(this.state.orderToRemove);
        }
        this.setState({
            removeOrderPopupVisible: false,
            orderToRemove: null
        });
    };

    changeLocation = () => {
        this.setState({ changeLocationPopupVisible: true });
    };

    changeLocationConfirmed = confirmed => {
        if (confirmed) {
            this.props.navigation.navigate('map');
        }
        this.setState({ changeLocationPopupVisible: false });
    };

    confirmPurchase = () => {
        Alert.alert('Confirm Purchase?', 'Woo-hoo! Send me a Hero!', [
            { text: 'Cancel' },
            { text: 'Confirm', onPress: () => this.lightAbeacon() }
        ]);
    };

    lightAbeacon = () => {
        const {
            stripeCustomerId,
            paymentMethod,
            firstName,
            lastName,
            totalCost,
            serviceFee,
            notes,
            cart,
            email,
            region
        } = this.props;
        if (paymentMethod) {
            const source = paymentMethod.id;
            const description = `Charge for ${email}`;
            this.props.submitPayment({
                stripeCustomerId,
                description,
                serviceFee,
                totalCost,
                source,
                notes,
                cart,
                firstName,
                lastName,
                region
            });
        } else {
            this.props.dropdownAlert(true, 'Go to Menu to add payment method');
        }
    };

    openDeliveryNotes = () => {
        this.props.navigation.navigate('deliveryNotes');
    };

    renderDropdownCards = () => {
        const { paymentMethod, cards } = this.props;
        return map(cards, (card, index) => {
            if (paymentMethod.id !== card.id) {
                return (
                    <PaymentDropDownItem
                        id={card.id}
                        onPress={this.props.changePaymentMethod}
                        isHeaderItem={false}
                        key={index}
                        type={card.card.brand}
                        brand={card.card.brand}
                        last4={card.card.last4}
                    />
                );
            }
        });
    };

    render() {
        const {
            cart,
            productImages,
            tax,
            serviceFee,
            deliveryFee,
            discount,
            pureCartTotal,
            totalCost,
            notes,
            address,
            region,
            pending,
            cartQuantity
        } = this.props;
        const {
            removeOrderPopupVisible,
            changeLocationPopupVisible
        } = this.state;
        const pureCartTotalFormatted = pureCartTotal
            ? (pureCartTotal / 100).toFixed(2)
            : 0;
        const serviceFeeFormatted = serviceFee
            ? (serviceFee / 100).toFixed(2)
            : 0;
        const deliveryFeeFormatted = deliveryFee
            ? (deliveryFee / 100).toFixed(2)
            : 0;
        const taxFormatted = tax ? (tax / 100).toFixed(2) : 0;
        let totalCostFormatted = 0;
        if (cartQuantity > 0) {
            totalCostFormatted = totalCost ? (totalCost / 100).toFixed(2) : 0;
        }
        const placeholderNotes = `(Help your hero find you. What color shirt are you wearing? What can help identify you and your location?)`;
        const discountStyles = discount
            ? [styles.cost, styles.costDiscount]
            : styles.cost;
        const dropdownCards = this.renderDropdownCards();

        return (
            <View style={styles.container}>
                {pending ? (
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    />
                ) : (
                    <ScrollView style={styles.scrollContainer}>
                        <TouchableOpacity
                            style={styles.checkout}
                            onPress={this.confirmPurchase}
                        >
                            <Text style={styles.imageTitle}>
                                {'LIGHT A BEACON!'}
                            </Text>
                            <Text style={styles.imageSubText}>
                                {'This notifies Heroes of your order request'}
                            </Text>
                            <Text style={styles.imageSubText}>
                                {`Total: $${totalCostFormatted}`}
                            </Text>
                            <View style={styles.checkoutIconContainer}>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    color="#fff"
                                    size={emY(2.8)}
                                    style={styles.checkoutIcon}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemHeaderLabel}>
                                DELIVERY NOTES
                            </Text>
                        </View>
                        <View style={styles.itemBody}>
                            <Text style={styles.itemBodyLabel}>
                                {notes ? `${notes}` : `${placeholderNotes}`}
                            </Text>
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={this.openDeliveryNotes}
                            >
                                <Text style={styles.itemButtonText}>
                                    Change
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemHeaderLabel}>
                                PAYMENT METHOD
                            </Text>
                        </View>
                        <DropDown
                            header={this.state.dropdownHeader}
                            dropDownRef={ref => (this.dropDownRef = ref)}
                        >
                            {dropdownCards}
                        </DropDown>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemHeaderLabel}>
                                DELIVERY LOCATION
                            </Text>
                        </View>
                        <View style={styles.itemBody}>
                            <Text style={styles.itemBodyLabel}>{address}</Text>
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={this.changeLocation}
                            >
                                <Text style={styles.itemButtonText}>
                                    Change
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <MapView
                                region={region}
                                style={styles.map}
                                pitchEnabled={false}
                                rotateEnabled={false}
                                scrollEnabled={false}
                            />
                            <View
                                pointerEvents="none"
                                style={styles.beaconWrapper}
                            >
                                <Image
                                    source={beaconIcon}
                                    style={styles.beaconMarker}
                                />
                            </View>
                        </View>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemHeaderLabel}>
                                PRODUCT SUMMARY
                            </Text>
                        </View>
                        <OrderList
                            orders={cart}
                            orderImages={productImages}
                            onAddOrder={this.props.addToCart}
                            onRemoveOrder={this.handleRemoveOrder}
                        />
                        <View style={styles.cart}>
                            {!!pureCartTotalFormatted &&
                                cartQuantity > 0 && (
                                    <View style={styles.meta}>
                                        <Text style={styles.label}>
                                            Subtotal:
                                        </Text>
                                        <Text style={styles.cost}>
                                            ${pureCartTotalFormatted}
                                        </Text>
                                    </View>
                                )}
                            {!!deliveryFee &&
                                cartQuantity > 0 && (
                                    <View style={styles.meta}>
                                        <Text style={styles.label}>
                                            Delivery:
                                        </Text>
                                        <Text style={styles.cost}>
                                            <Text>{!!discount && 'FREE '}</Text>
                                            <Text style={discountStyles}>
                                                {`$${deliveryFeeFormatted}`}
                                            </Text>
                                        </Text>
                                    </View>
                                )}
                            <View style={styles.meta}>
                                <Text style={styles.label}>Tax:</Text>
                                <Text style={styles.cost}>${taxFormatted}</Text>
                            </View>
                            {!!serviceFee && (
                                <View style={styles.meta}>
                                    <Text style={styles.label}>
                                        Service Fee:
                                    </Text>
                                    <Text style={styles.cost}>
                                        ${serviceFeeFormatted}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.metaTotal}>
                                <Text style={styles.labelTotal}>Total:</Text>
                                <Text style={styles.costTotal}>
                                    ${totalCostFormatted}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.checkout}
                            onPress={this.confirmPurchase}
                        >
                            <Text style={styles.imageTitle}>
                                {'LIGHT A BEACON!'}
                            </Text>
                            <Text style={styles.imageSubText}>
                                {'This notifies Heroes of your order request'}
                            </Text>
                            <View style={styles.checkoutIconContainer}>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    color="#fff"
                                    size={50}
                                    style={styles.checkoutIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                )}
                <OopsPopup
                    openModal={removeOrderPopupVisible}
                    closeModal={this.removeOrderConfirmed}
                    message={REMOVE_ORDER_MESSAGE}
                    showIcon={false}
                />
                <SuccessPopup
                    openModal={changeLocationPopupVisible}
                    closeModal={this.changeLocationConfirmed}
                    title={CHANGE_LOCATION_TITLE}
                    message={CHANGE_LOCATION_MESSAGE}
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
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: emY(13.81)
    },
    checkout: {
        height: WINDOW_HEIGHT / 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.DEFAULT
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1.875),
        textAlign: 'center'
    },
    imageSubText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1),
        textAlign: 'center'
    },
    checkoutIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    checkoutIcon: {
        backgroundColor: 'transparent'
    },
    itemHeader: {
        paddingHorizontal: 10,
        marginTop: emY(1.2)
    },
    itemHeaderLabel: {
        fontSize: emY(1),
        color: '#000',
        paddingBottom: emY(0.5),
        textDecorationLine: 'underline'
    },
    itemBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: emY(0.8),
        backgroundColor: Color.GREY_100
    },
    itemBodyLabel: {
        flex: 1,
        fontSize: emY(1),
        color: Color.GREY_800
    },
    itemButton: {
        width: 80,
        height: emY(1.5),
        alignItems: 'flex-end'
    },
    itemButtonText: {
        fontSize: emY(1),
        color: Color.BLUE_500
    },
    map: {
        height: MAP_HEIGHT,
        shadowColor: 'transparent',
        marginBottom: 5
    },
    beaconWrapper: {
        left: '50%',
        marginLeft: -(beaconEdgeLength / 2),
        marginTop: -(beaconEdgeLength / 2),
        position: 'absolute',
        top: '50%'
    },
    beaconMarker: {
        width: beaconEdgeLength,
        height: beaconEdgeLength
    },
    dropdownContainer: {
        marginBottom: emY(1)
    },
    cart: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10,
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
        justifyContent: 'space-between',
        marginBottom: 5,
        alignItems: 'center'
    },
    metaTotal: {
        borderTopColor: Color.GREY_600,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },
    label: {
        fontSize: 12,
        color: Color.GREY_600,
        marginRight: 11
    },
    cost: {
        fontSize: 12,
        color: Color.GREY_600
    },
    costDiscount: {
        textDecorationLine: 'line-through'
    },
    labelTotal: {
        fontSize: 14,
        color: '#000',
        marginRight: 11,
        marginTop: 10
    },
    costTotal: {
        fontSize: 14,
        color: '#000',
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 10
    },
    button: {
        backgroundColor: '#000',
        height: emY(3.75)
    },
    buttonText: {
        fontSize: emY(0.8125)
    }
});

const mapStateToProps = state => ({
    email: getEmail(state),
    cart: getCartOrders(state),
    pureCartTotal: getCartPureTotal(state),
    totalCost: getCartCostTotal(state),
    tax: getCartTax(state),
    serviceFee: getCartServiceFee(state),
    deliveryFee: getDeliveryFee(state),
    discount: getDiscount(state),
    notes: getNotes(state),
    address: getAddress(state),
    region: getRegion(state),
    cards: getCards(state),
    paymentMethod: getPaymentMethod(state),
    pending: getPending(state),
    stripeCustomerId: getStripeCustomerId(state),
    orderId: getOrderId(state),
    productImages: getProductImages(state),
    firstName: getFirstName(state),
    lastName: getLastName(state),
    cartQuantity: getCartTotalQuantity(state)
});

const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    dropdownAlert,
    submitPayment,
    changePaymentMethod
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutScreen);
