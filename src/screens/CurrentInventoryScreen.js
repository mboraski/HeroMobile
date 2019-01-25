// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { getInventory } from '../selectors/contractorSelectors';
import { getProductImages } from '../selectors/productSelectors';
import { fetchContractorInventory } from '../actions/contractorActions';
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

class CurrentInventoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Current Inventory',
        headerLeft: <BackButton onPress={() => navigation.goBack()} />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    });

    componentDidMount() {
        // TODO: implement
        // this.props.fetchContractorInventory();
    }

    render() {
        const { contractorProducts, productImages } = this.props;
        return (
            <View style={styles.container}>
                <OrderList
                    displayOnly
                    orders={contractorProducts}
                    orderImages={productImages}
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
    contractorProducts: getInventory(state),
    productImages: getProductImages(state)
});

const mapDispatchToProps = {
    fetchContractorInventory: () => dispatch =>
        fetchContractorInventory(dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentInventoryScreen);
