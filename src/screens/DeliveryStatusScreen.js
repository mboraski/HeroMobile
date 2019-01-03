// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuButton from '../components/MenuButton';
import BrandButton from '../components/BrandButton';
import NotificationContainer from '../containers/NotificationContainer'; // TODO: fix linter error
import HeroListContainer from '../containers/HeroListContainer';
import Text from '../components/Text';

import Color from '../constants/Color';
import Style from '../constants/Style';
import { orderStatuses, contractorStatuses } from '../constants/Order';

import { emY } from '../utils/em';

import {
    getOrderId,
    getStatus,
    getPending,
    getFullActualFulfillment,
    getPartialActualFulfillment,
    getContractorStatus
} from '../selectors/orderSelectors';

import { clearCart } from '../actions/cartActions';
import {
    unListenToOrderFulfillment,
    unListenOrderError,
    unListenOrderStatus,
    clearOrder
} from '../actions/orderActions';
import { dropdownAlert } from '../actions/uiActions';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

class DeliveryStatusScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Order',
        headerLeft: (
            <MenuButton navigation={navigation} style={Style.headerLeft} />
        ),
        headerRight: (
            <BrandButton
                onPress={() => {
                    /* contact Hero options */
                }}
            />
        ),
        headerStyle: Style.headerBorderless,
        headerTitleStyle: [Style.headerTitle, Style.headerTitleLogo]
    });

    state = {
        modalVisible: false
    };

    componentDidMount() {
        this.props.dropdownAlert(false, '');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.contractorStatus === contractorStatuses.delivered) {
            this.props.navigation.navigate('feedback');
        } else if (this.props.status !== nextProps.status) {
            // TODO: uncomment when users can X out of giving feedback
            // if (nextProps.status === orderStatuses.completed) {
            //     this.props.navigation.navigate('map');
            // }
            if (nextProps.status === orderStatuses.cancelled) {
                this.props.navigation.navigate('checkout');
            }
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderHeroList() {
        return (
            <View style={styles.heroList}>
                <HeroListContainer />
            </View>
        );
    }

    render() {
        const { orderId, status } = this.props;
        const activity =
            status !== orderStatuses.completed &&
            status !== orderStatuses.cancelled;
        return (
            <View style={styles.container}>
                {orderId ? (
                    <View style={styles.statusContainer}>
                        {activity && (
                            <View style={styles.spinner}>
                                <ActivityIndicator
                                    animating={activity}
                                    size="large"
                                    color="#F5A623"
                                />
                            </View>
                        )}
                        <View style={styles.notifications}>
                            <NotificationContainer />
                        </View>
                        {status === orderStatuses.inProgress ||
                            (status === orderStatuses.satisfied &&
                                this.renderHeroList())}
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text>No current orders</Text>
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
    statusContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    heroList: {
        position: 'absolute',
        bottom: 30,
        width: '100%'
    },
    profile: {
        alignItems: 'center',
        marginTop: emY(2.68)
    },
    loader: {
        height: emY(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: emY(1)
    },
    imageContainer: {
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.GREY_300,
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [0, -SIZE * 1] }, { scale: 1 }]
    },
    notifications: {
        paddingVertical: 40
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [-SIZE / 2, -SIZE / 2] }, { scale: 1.4 }]
    },
    searching: {
        color: Color.GREY_600,
        fontSize: emY(1.4375),
        textAlign: 'center',
        marginBottom: emY(3)
    },
    spinner: {
        marginTop: 30,
        marginBottom: 20
    }
});

const mapStateToProps = state => ({
    header: state.header,
    orderId: getOrderId(state),
    status: getStatus(state),
    pending: getPending(state),
    full: getFullActualFulfillment(state),
    partial: getPartialActualFulfillment(state),
    contractorStatus: getContractorStatus(state)
});

const mapDispatchToProps = {
    clearCart,
    clearOrder,
    unListenToOrderFulfillment,
    unListenOrderError,
    unListenOrderStatus,
    dropdownAlert
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeliveryStatusScreen);
