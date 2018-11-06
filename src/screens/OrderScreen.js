// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import { getOrders } from '../selectors/contractorSelectors';
import { changeOrderStatus } from '../actions/contractorActions';
import BackButton from '../components/BackButton';
import Style from '../constants/Style';

class OrderScreen extends Component {
    changeOrderStatusEnRoute = () => {
        this.props.changeOrderStatus('');
    };

    changeOrderStatusArrived = () => {
        this.props.changeOrderStatus('');
    };

    changeOrderStatusCompleted = () => {
        this.props.changeOrderStatus('');
    };

    render() {
        const { orders, orderId } = this.props;
        // TODO: show product list and count
        return (
            <View style={styles.container}>
                <Button
                    title={'En Route'}
                    buttonStyle={styles.button}
                    onPress={this.changeOrderStatusEnRoute}
                />
                <Button
                    title={'Arrived'}
                    buttonStyle={styles.button}
                    onPress={this.changeOrderStatusArrived}
                />
                <Button
                    title={'Completed'}
                    buttonStyle={styles.button}
                    onPress={this.changeOrderStatusCompleted}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    }
});

const mapStateToProps = (state, props) => {
    const orderId =
        props.navigation.state.params && props.navigation.state.params.orderId;
    return {
        orderId,
        orders: getOrders(state)
    };
};

const mapDispatchToProps = {
    changeOrderStatus
};

OrderScreen.navigationOptions = ({ navigation }) => ({
    title: 'Order Details',
    headerLeft: <BackButton onPress={() => navigation.pop()} />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderScreen);
