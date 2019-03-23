// Third Party Imports
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    Image,
    ActivityIndicator
} from 'react-native';
import { MapView, PROVIDER_GOOGLE } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import debounce from 'lodash.debounce';

// Relative Imports
import {
    saveAddress,
    setRegion,
    getCurrentLocation,
    nullifyError,
    determineDeliveryDistance,
    closeLocationFeedbackPopup,
    sendLocationFeedback
} from '../actions/mapActions';
import { reverseGeocode } from '../actions/googleMapsActions';
import { toggleSearch, dropdownAlert } from '../actions/uiActions';
import { getUserReadable } from '../actions/authActions';

import {
    getProductsPending,
    getError as getProductsError
} from '../selectors/productSelectors';
import { getSearchVisible } from '../selectors/uiSelectors';
import {
    getPredictions,
    getRegion,
    getAddress,
    getError,
    getPending,
    getTimestamp,
    getLocationFeedbackPopupVisible
} from '../selectors/mapSelectors';

import { firebaseAuth } from '../../firebase';
import SuccessPopup from '../components/SuccessPopup';
import PredictionList from '../components/PredictionList';
import Text from '../components/Text';
import MapHeaderContainer from '../containers/MapHeaderContainer';

import ERRORS from '../constants/Errors';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import beaconIcon from '../assets/icons/beacon2x.png';

const OPACITY_DURATION = 300;
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};

const beaconEdgeLength = emY(10);

class MapScreen extends Component {
    state = {
        mapReady: false,
        address: '',
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        searchRendered: false,
        getCurrentPositionPending: false,
        initialMessageVisible: false,
        changeLocationPopupVisible: false
    };

    componentWillMount() {
        if (!firebaseAuth.currentUser) {
            this.props.navigation.navigate('welcome');
        }
    }

    componentDidMount() {
        const region = this.props.region;
        this.getAddress({
            latlng: `${region.latitude},${region.longitude}`
        });
        this.props.getCurrentLocation();
        // TODO: change to only fetch info that is needed
        this.props.getUserReadable();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
        if (
            this.props.pending === true &&
            nextProps.pending === false &&
            !nextProps.error
        ) {
            this.props.navigation.navigate('products');
        }
        if (this.props.productsError) {
            this.props.dropdownAlert(true, ERRORS['001']);
        }
    }

    onMapReady = () => {
        this.setState({ mapReady: true });
    };

    getAddress = debounce(this.props.reverseGeocode, 500, {
        leading: false,
        tailing: true
    });

    debounceRegion = debounce(this.props.setRegion, 500, {
        leading: false,
        tailing: true
    });

    confirmLocationPress = () => {
        this.props.determineDeliveryDistance(this.props.region);
    };

    handleRegionChange = region => {
        this.debounceRegion(region);
        this.getAddress({
            latlng: `${region.latitude},${region.longitude}`
        });
    };

    handleAddress = address => {
        this.setState({ address });
    };

    handleAddressFocus = () => {
        this.props.dropdownAlert(false, '');
        this.props.toggleSearch();
    };

    handleCloseContinuePopup = () => {
        this.props.nullifyError();
    };

    selectPrediction = prediction => {
        this.props.saveAddress(prediction.description);
        this.props.toggleSearch();
    };

    animate = searchVisible => {
        if (this.state.searchRendered) {
            this.afterSetState(searchVisible);
        } else {
            this.setState({ searchRendered: searchVisible }, () =>
                this.afterSetState(searchVisible)
            );
        }
    };

    afterSetState = searchVisible => {
        Animated.parallel([
            Animated.timing(this.state.translateY, {
                toValue: searchVisible ? -100 : 0,
                duration: OPACITY_DURATION
            }),
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            })
        ]).start(() => {
            this.setState({
                searchRendered: searchVisible
            });
        });
    };

    sendLocationFeedback = agree => {
        const { timestamp, region } = this.props;
        const freshTimestamp = timestamp || Date.now();
        if (agree) {
            this.props.sendLocationFeedback(region, freshTimestamp);
        }
        this.props.closeLocationFeedbackPopup();
    };

    render() {
        const {
            predictions,
            region,
            address,
            pending,
            error,
            mapPending,
            locationFeedbackPopupVisible
        } = this.props;
        const errorCode = error ? error.code : 'default';
        const errorMessage = ERRORS[errorCode];

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={region}
                    showsCompass
                    showsPointsOfInterest
                    provider={PROVIDER_GOOGLE}
                    onMapReady={this.onMapReady}
                    onRegionChange={this.handleRegionChange}
                />
                <View pointerEvents="none" style={styles.beaconWrapper}>
                    <Image source={beaconIcon} style={styles.beaconMarker} />
                </View>
                <TouchableWithoutFeedback
                    onPress={this.handleAddressFocus}
                    disabled={pending}
                >
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            { zIndex: 2 },
                            {
                                opacity: this.state.opacity,
                                transform: [
                                    { translateY: this.state.translateY }
                                ]
                            }
                        ]}
                    >
                        {pending || mapPending ? (
                            <ActivityIndicator
                                animating={pending || mapPending}
                                size="small"
                                color="#f5a623"
                            />
                        ) : (
                            <View>
                                <Text style={styles.inputLabel}>To</Text>
                                <Text style={styles.inputValue}>{address}</Text>
                            </View>
                        )}
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        {
                            opacity: this.state.opacity
                        }
                    ]}
                >
                    <Button
                        large
                        title="Set Location"
                        onPress={this.confirmLocationPress}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        disabled={pending}
                    />
                </Animated.View>
                {!!this.state.searchRendered && (
                    <PredictionList
                        predictions={predictions}
                        selectPrediction={this.selectPrediction}
                        style={[
                            styles.predictions,
                            {
                                opacity: this.state.opacity.interpolate(
                                    REVERSE_CONFIG
                                )
                            }
                        ]}
                    />
                )}
                <SuccessPopup
                    openModal={locationFeedbackPopupVisible}
                    closeModal={this.sendLocationFeedback}
                    title={'REQUEST HEROES!'}
                    message={errorMessage}
                    confirmText={'Send'}
                    logo
                    showIcon
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: emY(1.25),
        left: 0,
        right: 0
    },
    button: {
        backgroundColor: Color.DEFAULT,
        borderRadius: 5,
        justifyContent: 'center',
        height: emY(3.9),
        padding: 0
    },
    buttonText: {
        color: Color.WHITE,
        fontSize: emY(1.5),
        textAlign: 'center'
    },
    inputContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: emY(0.625),
        borderRadius: 5,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 7 },
                shadowOpacity: 0.17,
                shadowRadius: 8
            },
            android: {
                elevation: 2
            }
        }),
        flexWrap: 'wrap'
    },
    inputLabel: {
        fontSize: emY(1.25),
        fontWeight: 'bold',
        color: Color.GREY_400,
        marginRight: 50
    },
    inputValue: {
        fontSize: emY(1.25)
    },
    predictions: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
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
    }
});

MapScreen.navigationOptions = {
    header: <MapHeaderContainer />
};

const mapStateToProps = state => ({
    pending: getProductsPending(state),
    mapPending: getPending(state),
    predictions: getPredictions(state),
    searchVisible: getSearchVisible(state),
    header: state.header,
    region: getRegion(state),
    address: getAddress(state),
    timestamp: getTimestamp(state),
    error: getError(state),
    productsError: getProductsError(state),
    locationFeedbackPopupVisible: getLocationFeedbackPopupVisible(state)
});

const mapDispatchToProps = {
    nullifyError,
    getUserReadable,
    saveAddress,
    toggleSearch,
    dropdownAlert,
    setRegion,
    reverseGeocode,
    getCurrentLocation,
    determineDeliveryDistance,
    closeLocationFeedbackPopup,
    sendLocationFeedback
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapScreen);
