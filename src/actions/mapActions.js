import { Location, Permissions } from 'expo';

import { dropdownAlert } from './uiActions';
import { online, OFFLINE } from './contractorActions';

export const GET_CURRENT_LOCATION_REQUEST = 'get_current_location_request';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_ERROR = 'get_current_location_error';
export const ADD_LOCATION_SUBSCRIPTION = 'add_location_subscription';
export const REMOVE_LOCATION_SUBSCRIPTION = 'remove_location_subscription';

export const getCurrentLocation = region => async dispatch => {
    try {
        dispatch({ type: GET_CURRENT_LOCATION_REQUEST });
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch({ type: OFFLINE });
            dispatch(
                dropdownAlert(true, 'Permission to access location was denied')
            );
            throw new Error('Permission to access location was denied');
        } else {
            const locationServices = await Location.getProviderStatusAsync();
            if (!locationServices.locationServicesEnabled) {
                dispatch({ type: OFFLINE });
                dispatch(
                    dropdownAlert(true, 'Location services need to be enabled')
                );
                throw new Error('Location services need to be enabled');
            }
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                maximumAge: 10000
            });
            // listenForLocationChanges(dispatch); // TODO: add back in
            dispatch({
                type: GET_CURRENT_LOCATION_SUCCESS,
                payload: {
                    timestamp: location.timestamp,
                    coords: location.coords
                }
            });
            online(region, dispatch);
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_LOCATION_ERROR,
            error
        });
        dispatch({ type: OFFLINE });
    }
};
