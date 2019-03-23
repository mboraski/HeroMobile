// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    StyleSheet,
    Linking,
    Platform,
    Text,
    Modal,
    TouchableOpacity,
    Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { firebaseAuth } from '../../firebase';

// Relative Imports
import ChatModalContainer from '../containers/ChatModalContainer';
import { changeOrderStatus } from '../actions/contractorActions';
import { setOrderId, openChatModal, setChatId } from '../actions/orderActions';
import { getOrders } from '../selectors/contractorSelectors';
import { getChatModalVisible } from '../selectors/orderSelectors';
import { emY } from '../utils/em';
import messageIcon from '../assets/icons/multi_message.png';
import Color from '../constants/Color';
import BackButton from '../components/BackButton';
import OrderCartInfo from '../components/OrderCartInfo';
import Style from '../constants/Style';

const CHAT_SIZE = emY(2.8);
const CHAT_IMAGE_SIZE = emY(1.65);

class OrderScreen extends Component {
    state = {
        cart: {},
        notes: '',
        region: {
            latitude: '',
            longitude: ''
        },
        firstName: 'first name',
        lastName: 'last name',
        contractorStatus: ''
    };

    componentWillMount() {
        const { orders, orderId } = this.props;
        const order = this.specifyOrder(orders, orderId);
        if (order) {
            this.setCustomerInfo(order);
            this.setCart(order);
            this.setStatus(order);
        }
    }

    componentDidMount() {
        this.props.setOrderId(this.props.orderId);
        this.props.setChatId(firebaseAuth.currentUser.uid);
    }

    componentWillReceiveProps(nextProps) {
        const newOrders = nextProps.orders || this.props.orders;
        const newOrderId = nextProps.orderId || this.props.orderId;
        const order = this.specifyOrder(newOrders, newOrderId);
        if (order) {
            this.setCustomerInfo(order);
            this.setCart(order);
            this.setStatus(order);
        }
    }

    setCustomerInfo = order => {
        const { firstName, lastName, region, notes } = order.consumerInfo;
        return this.setState({
            firstName,
            lastName,
            region,
            notes
        });
    };

    setCart = order => {
        const { cart } = order;
        return this.setState({
            cart
        });
    };

    setStatus = order => {
        const uid = firebaseAuth.currentUser.uid;
        const { fulfillment } = order;
        const actual = fulfillment.actualFulfillment;
        const full = actual.full;
        const contractorDetails = full[uid] || null;
        if (contractorDetails) {
            this.setState({
                contractorStatus: contractorDetails.status
            });
        }
        return;
    };

    changeOrderStatusEnRoute = () => {
        const { orderId } = this.props;

        return this.props.changeOrderStatus('en_route', orderId);
    };

    changeOrderStatusArrived = () => {
        const { orderId } = this.props;

        return this.props.changeOrderStatus('arrived', orderId);
    };

    changeOrderStatusCompleted = () => {
        const { orderId } = this.props;

        return this.props.changeOrderStatus('delivered', orderId);
    };

    specifyOrder = (orders, orderId) => {
        // TODO: log error if no match;
        return orders[orderId];
    };

    contactConsumer = () => {
        this.props.openChatModal(firebaseAuth.currentUser.uid);
    };

    askForDirections = () => {
        const { region, firstName, lastName } = this.state;
        const lat = region.latitude;
        const lon = region.longitude;
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q='
        });
        const latLng = `${lat},${lon}`;
        const label = `${firstName} ${lastName}`;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
        // const { address } = this.props;
        // const encodedAddress = encodeURIComponent(address);
        // if (Platform.OS === 'ios') {
        //     Linking.openURL(`http://maps.apple.com/?ll=37.484847,-122.148386`);
        // } else {
        //     Linking.openURL(`http://maps.google.com/?daddr=${encodedAddress}`);
        // }
        return;
    };

    render() {
        const {
            cart,
            firstName,
            lastName,
            notes,
            contractorStatus
        } = this.state;
        const { modalVisible } = this.props;

        return (
            <ScrollView style={styles.container}>
                <OrderCartInfo products={cart} />
                <Button
                    title={'View Route'}
                    buttonStyle={styles.button}
                    onPress={this.askForDirections}
                />
                <Text style={styles.titleLabel}>
                    {'Consumer Name: '}
                    <Text
                        style={styles.valueLabel}
                    >{`${firstName} ${lastName}`}</Text>
                </Text>
                <TouchableOpacity
                    style={styles.chatButton}
                    onPress={this.contactConsumer}
                >
                    <Image source={messageIcon} style={styles.chatImage} />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                >
                    <ChatModalContainer />
                </Modal>
                <Text style={styles.titleLabel}>
                    {'Order Status: '}
                    <Text style={styles.valueLabel}>{contractorStatus}</Text>
                </Text>
                <Text style={styles.titleLabel}>
                    {'Order Notes: '}
                    <Text style={styles.valueLabel}>{notes}</Text>
                </Text>
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
            </ScrollView>
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
    },
    titleLabel: {
        fontSize: emY(1),
        color: Color.GREY_600
    },
    valueLabel: {
        fontSize: emY(1),
        color: Color.YELLOW_600
    },
    chatButton: {
        backgroundColor: Color.GREY_400,
        width: CHAT_SIZE,
        height: CHAT_SIZE,
        borderRadius: CHAT_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: emY(0.7)
    },
    chatImage: {
        borderRadius: 0,
        width: CHAT_IMAGE_SIZE,
        height: (CHAT_IMAGE_SIZE * 13) / 15
    }
});

const mapStateToProps = (state, props) => {
    const id =
        props.navigation.state.params && props.navigation.state.params.orderId;
    return {
        orderId: id,
        orders: getOrders(state),
        modalVisible: getChatModalVisible(state)
    };
};

const mapDispatchToProps = {
    changeOrderStatus,
    openChatModal,
    setOrderId,
    setChatId
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
