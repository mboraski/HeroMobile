import { Location, Permissions } from 'expo';

import { geocode } from './googleMapsActions';
import { online, OFFLINE, ONLINE } from './contractorActions';

import { dropdownAlert } from './uiActions';

export const SAVE_ADDRESS = 'save_address';
export const SET_REGION = 'set_region';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const GET_CURRENT_LOCATION_REQUEST = 'get_current_location_request';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_ERROR = 'get_current_location_error';
export const ADD_LOCATION_SUBSCRIPTION = 'add_location_subscription';
export const REMOVE_LOCATION_SUBSCRIPTION = 'remove_location_subscription';
export const SET_INITIAL_REGION = 'set_initial_region';
export const NULLIFY_MAP_ERROR = 'nullify_map_error';
export const NO_HEROES_AVAILABLE = 'no_heroes_available';

// const listenForLocationChanges = dispatch => {
//     const locationSubscription = Location.watchPositionAsync(
//         {
//             enableHighAccuracy: true,
//             timeInterval: 5000,
//             distanceInterval: 3
//         },
//         location => {
//             dispatch({
//                 type: GET_CURRENT_LOCATION_SUCCESS,
//                 payload: {
//                     timestamp: location.timestamp,
//                     coords: location.coords
//                 }
//             });
//         }
//     );
//     dispatch({
//         type: ADD_LOCATION_SUBSCRIPTION,
//         payload: locationSubscription
//     })
// };
//
// export const unlistenForProviderStatusChanges = subscription => dispatch => {
//     subscription.remove();
//     dispatch({
//         type: REMOVE_LOCATION_SUBSCRIPTION
//     })
// };
export const nullifyError = () => dispatch =>
    dispatch({ type: NULLIFY_MAP_ERROR });

export const saveAddress = address => dispatch => {
    dispatch({ type: SAVE_ADDRESS, payload: address });
    return dispatch(geocode({ address }));
};

export const setRegion = region => dispatch =>
    dispatch({
        type: SET_REGION,
        payload: region
    });

export const noHeroesAvailable = errObj => dispatch =>
    dispatch({
        type: NO_HEROES_AVAILABLE,
        payload: errObj
    });

export const getCurrentLocation = () => async dispatch => {
    try {
        dispatch({ type: ONLINE });
        dispatch({ type: GET_CURRENT_LOCATION_REQUEST });
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch(
                dropdownAlert(true, 'Permission to access location denied!')
            );
            throw new Error('Permission to access location was denied');
        } else {
            const locationServices = await Location.getProviderStatusAsync();
            if (!locationServices.locationServicesEnabled) {
                dispatch(
                    dropdownAlert(true, 'Location services need to be enabled')
                );
                throw new Error('Location services need to be enabled');
            }
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                maximumAge: 5000
            });
            // listenForLocationChanges(dispatch); // TODO: add back in
            const coords = location.coords || {};
            dispatch({
                type: SET_REGION,
                payload: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0043
                }
            });
            dispatch({
                type: GET_CURRENT_LOCATION_SUCCESS,
                payload: {
                    timestamp: location.timestamp,
                    coords: location.coords
                }
            });
            const region = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                timestamp: location.timestamp,
                coords: location.coords
            };
            online(region, dispatch);
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_LOCATION_ERROR,
            error
        });
        dispatch(dropdownAlert(true, 'Error using current location'));
        dispatch({ type: OFFLINE });
    }
};
