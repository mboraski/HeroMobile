import { Location, Permissions } from 'expo';

import { geocode, reverseGeocode } from './googleMapsActions';
import Dimensions from '../constants/Dimensions';

const ASPECT_RATIO = Dimensions.window.width / Dimensions.window.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const SAVE_ADDRESS = 'save_address';
export const SET_REGION = 'set_region';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const GET_CURRENT_LOCATION_REQUEST = 'get_current_location_request';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_ERROR = 'get_current_location_error';

export const saveAddress = address => dispatch => {
    dispatch({ type: SAVE_ADDRESS, payload: address });
    return dispatch(geocode({ address }));
};
export const setRegion = region => dispatch => {
    dispatch({ type: SET_REGION, payload: region });
    return dispatch(reverseGeocode({ latlng: `${region.latitude},${region.longitude}` }));
};

export const getCurrentLocation = () => async dispatch => {
    dispatch({ type: GET_CURRENT_LOCATION_REQUEST });
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        dispatch({
            type: GET_CURRENT_LOCATION_ERROR,
            error: 'Permission to access location was denied'
        });
    }
    const location = await Location.getCurrentPositionAsync({});
    dispatch(
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    );
    dispatch({ type: GET_CURRENT_LOCATION_SUCCESS });
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };
};
