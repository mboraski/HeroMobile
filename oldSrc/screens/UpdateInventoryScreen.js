// 3rd Party Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Platform,
    Animated,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import Text from '../components/Text';
import OrderList from '../components/OrderList';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import {
    getUpdateInventory,
    getCartOrders,
    getInventoryTotalQuantity
} from '../selectors/cartSelectors';
import {
    confirmUpdateInventory,
    addToInventory,
    removeFromInventory
} from '../actions/contractorActions';
import { dropdownAlert } from '../actions/uiActions';

export class UpdateInventoryScreeen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Update Inventory',
        headerLeft: <BackButton onPress={() => navigation.goBack()} />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    });

    state = {
        opacity: new Animated.Value(1)
    };

    componentDidMount() {
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

    confirmUpdate = () => {
        this.props.confirmUpdateInventory(this.props.cartOrders);
    };

    handleAddOrder = product => {
        console.log('handleAddOrder: ', product);
        this.props.addToInventory(product);
    };

    handleRemoveOrder = product => {
        this.props.removeFromInventory(product);
    };

    render() {
        const {
            updateInventory,
            pending,
            orderImages,
            inventoryTotalQuantity
        } = this.props;
        return (
            <View style={styles.container}>
                {pending ? (
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    />
                ) : (
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.container}>
                            <OrderList
                                orders={updateInventory}
                                orderImages={orderImages}
                                onAddOrder={this.handleAddOrder}
                                onRemoveOrder={this.handleRemoveOrder}
                            />
                        </View>
                        <View style={styles.cart}>
                            <View style={styles.meta}>
                                <Text style={styles.label}>
                                    Total Quantity:
                                </Text>
                                <Text style={styles.cost}>
                                    {inventoryTotalQuantity}
                                </Text>
                            </View>
                            <Button
                                onPress={this.confirmUpdate}
                                title="CONFIRM UPDATE!"
                                containerViewStyle={styles.buttonContainer}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </ScrollView>
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
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: emY(13.81)
    },
    itemHeader: {
        paddingHorizontal: 20,
        paddingVertical: emY(0.8)
    },
    itemHeaderLabel: {
        fontSize: emY(0.83),
        color: Color.GREY_600
    },
    itemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: emY(0.8),
        backgroundColor: Color.GREY_100
    },
    itemBodyLabel: {
        width: Dimensions.window.width - 160,
        fontSize: emY(1.08),
        color: Color.GREY_800
    },
    itemButton: {
        width: 80,
        height: emY(1.5),
        alignItems: 'flex-end'
    },
    itemButtonText: {
        fontSize: emY(1.08),
        color: Color.BLUE_500
    },
    dropdownContainer: {
        marginBottom: emY(19.19)
    },
    cart: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 23,
        paddingVertical: 20,
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
        marginBottom: emY(0.5),
        alignItems: 'center'
    },
    label: {
        fontSize: emY(1),
        color: Color.GREY_600,
        marginRight: 11
    },
    cost: {
        fontSize: emY(1.25)
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: emY(1)
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
    updateInventory: getUpdateInventory(state),
    itemCountUp: state.cart.itemCountUp,
    itemCountDown: state.cart.itemCountDown,
    pending: state.inventory.pending,
    orderImages: state.product.productImages,
    inventoryTotalQuantity: getInventoryTotalQuantity(state),
    cartOrders: getCartOrders(state)
});

const mapDispatchToProps = {
    addToInventory,
    removeFromInventory,
    confirmUpdateInventory,
    dropdownAlert
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateInventoryScreeen);
