// Third Party Imports
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    ActivityIndicator
} from 'react-native';
import { MapView, Constants, PROVIDER_GOOGLE } from 'expo';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import debounce from 'lodash.debounce';
import { ref } from '../../firebase';

// Relative Imports
import {
    saveAddress,
    setRegion,
    getCurrentLocation,
    nullifyError
} from '../actions/mapActions';
import { setCurrentLocation } from '../actions/cartActions';
import { distanceMatrix, reverseGeocode } from '../actions/googleMapsActions';
import { toggleSearch, dropdownAlert } from '../actions/uiActions';
import {
    orderCreationSuccess,
    orderCreationFailure
} from '../actions/orderActions';
import { getUserReadable } from '../actions/authActions';
import { fetchCustomerBlock } from '../actions/productActions';

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
    getPending
} from '../selectors/mapSelectors';

import ContinuePopup from '../components/ContinuePopup';
import SuccessPopup from '../components/SuccessPopup';
import PredictionList from '../components/PredictionList';
import Text from '../components/Text';
import MapHeaderContainer from '../containers/MapHeaderContainer';

import ERRORS from '../constants/Errors';
import Color from '../constants/Color';
import { emY } from '../utils/em';
// TODO: how accurate is the center of the bottom point of the beacon?
import beaconIcon from '../assets/icons/beacon.png';

// TODO: allow users to just click a button to ask for service in a particular area.
// Make sure to rate limit by account or something, so it isn't abused

const originRegion = {
    latitude: 30.24063,
    longitude: -97.78595
};

const OPACITY_DURATION = 300;
const REVERSE_CONFIG = {
    inputRange: [0, 1],
    outputRange: [1, 0]
};
// TODO: needs to be changed to the bottom center of image
const ANCHOR = {
    x: 0.2,
    y: 1
};
const CENTER_OFFSET = {
    x: 12,
    y: -55 / 2
};
const MARKER_ANIMATION_DURATION = 0;

const CHANGE_LOCATION_TITLE =
    'Are you sure you want to change your delivery location?';
const CHANGE_LOCATION_MESSAGE =
    'The available products/services at your new location may be different.';

class MapScreen extends Component {
    state = {
        mapReady: false,
        address: '',
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        searchRendered: false,
        getCurrentPositionPending: false,
        initialMessageVisible: false,
        animatedRegion: new MapView.AnimatedRegion(this.props.region),
        changeLocationPopupVisible: false
    };

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.props.dropdownAlert(
                true,
                'Oops, this will only work on a device'
            );
        } else if (!this.props.coords) {
            this.props.getCurrentLocation();
        }
        // TODO: change to only fetch info that is needed
        this.props.getUserReadable();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
        // TODO: can I remove the drawer navigation here?
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
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
        if (this.props.region !== nextProps.region) {
            this.debounceMarker(nextProps.region);
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

    confirmLocationPress = async () => {
        let resp;
        const result = await this.props.distanceMatrix({
            units: 'imperial',
            origins: `${originRegion.latitude}, ${originRegion.longitude}`,
            destinations: `${this.props.region.latitude},${
                this.props.region.longitude
            }`
        });
        if (result.rows[0].elements[0].duration.value > 60 * 15) {
            this.props.dropdownAlert(true, 'Service is not available here');
            resp = result;
        } else {
            this.props.fetchCustomerBlock();
        }
        return resp;
        // TODO: handle resetting location after order creation
        // this.setState({ changeLocationPopupVisible: true });
    };

    changeLocationConfirmed = async confirmed => {
        // close change location warning modal
        this.setState({ changeLocationPopupVisible: false });

        // if the user click 'Apply', continue with use current location
        if (confirmed) {
            let resp;
            const result = await this.props.distanceMatrix({
                units: 'imperial',
                origins: '30.268066,-97.7450017', // 'E 6th St & Congress Ave, Austin, TX 78701'
                destinations: `${this.props.region.latitude},${
                    this.props.region.longitude
                }`
            });
            if (result.rows[0].elements[0].duration.value > 60 * 30) {
                this.props.dropdownAlert(true, ERRORS['007']);
                resp = result;
            } else {
                this.props.dropdownAlert(false, '');
                this.props.setCurrentLocation(
                    this.props.address,
                    this.props.region
                );
                try {
                    resp = await ref('orders/US/TX/Austin').push({
                        currentSetAddress: this.props.address,
                        region: this.props.region,
                        status: 'open'
                    });
                    if (resp) {
                        const key = resp.path.pieces_.join('/'); // eslint-disable-line
                        this.props.orderCreationSuccess(key);
                        this.props.navigation.navigate('products');
                    } else {
                        throw new Error('Error setting location');
                    }
                } catch (error) {
                    resp = error;
                    const message =
                        error.message || // just while dev TODO: remove
                        'Error setting location, please change and try again';

                    this.props.orderCreationFailure(error); // TODO: log this error to server
                    this.props.dropdownAlert(true, message);
                }
            }
            return resp;
        }
    };

    animateMarkerToCoordinate = coordinate => {
        if (Platform.OS === 'android') {
            if (this.marker) {
                /* eslint-disable no-underscore-dangle */
                this.marker._component.animateMarkerToCoordinate(
                    /* eslint-enable no-underscore-dangle */
                    coordinate,
                    MARKER_ANIMATION_DURATION
                );
            }
        } else {
            this.state.animatedRegion
                .timing({
                    ...coordinate,
                    duration: MARKER_ANIMATION_DURATION
                })
                .start();
        }
    };

    // This ensures the marker is set to new coords if user selects address prediction
    debounceMarker = debounce(this.animateMarkerToCoordinate, 500, {
        leading: false,
        tailing: true
    });

    handleRegionChange = region => {
        this.animateMarkerToCoordinate(region);
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

    handleCloseContinuePopup = () => {
        this.props.nullifyError();
    };

    render() {
        const {
            predictions,
            region,
            address,
            pending,
            error,
            mapPending
        } = this.props;
        const errorCode = error ? error.code : 'default';
        const errorMessage = ERRORS[errorCode];

        const { changeLocationPopupVisible } = this.state;

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
                >
                    <MapView.Marker.Animated
                        image={beaconIcon}
                        coordinate={this.state.animatedRegion}
                        title="You"
                        description="Your Delivery Location"
                        anchor={ANCHOR}
                        centerOffset={CENTER_OFFSET}
                        style={styles.beaconMarker}
                    />
                </MapView>
                {(pending || mapPending) && (
                    <View style={styles.overlay}>
                        <ActivityIndicator
                            animating={pending || mapPending}
                            size="large"
                            color="#f5a623"
                        />
                    </View>
                )}
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
                        <Text style={styles.inputLabel}>To</Text>
                        <Text style={styles.inputValue}>{address}</Text>
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
                        title="Confirm Location"
                        onPress={this.confirmLocationPress}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        disabled={pending}
                    />
                </Animated.View>
                {this.state.searchRendered ? (
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
                ) : null}
                <ContinuePopup
                    isOpen={!!error}
                    closeModal={this.handleCloseContinuePopup}
                    message={errorMessage}
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
        backgroundColor: '#000',
        paddingVertical: emY(1.25)
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: emY(1.25),
        fontFamily: 'Arial'
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
    beaconMarker: {
        maxWidth: 42,
        maxHeight: 55
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
    error: getError(state),
    productsError: getProductsError(state)
});

const mapDispatchToProps = {
    nullifyError,
    fetchCustomerBlock,
    getUserReadable,
    saveAddress,
    toggleSearch,
    dropdownAlert,
    setRegion,
    setCurrentLocation,
    getCurrentLocation,
    distanceMatrix,
    reverseGeocode,
    orderCreationSuccess,
    orderCreationFailure
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapScreen);
