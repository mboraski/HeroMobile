import googleMapsClient from '../api/googleMaps';

const KEY = 'AIzaSyB6jHNd8EuHCPh0DG4dauA4ntSkAfJKF5I';

export const MAPS_PLACES_AUTOCOMPLETE_REQUEST =
    'google_maps_places_autocomplete_request';
export const MAPS_PLACES_AUTOCOMPLETE_SUCCESS =
    'google_maps_places_autocomplete_success';
export const MAPS_PLACES_AUTOCOMPLETE_FAIL =
    'google_maps_places_autocomplete_fail';

export const MAPS_GEOCODE_REQUEST = 'google_maps_geocode_request';
export const MAPS_GEOCODE_SUCCESS = 'google_maps_geocode_success';
export const MAPS_GEOCODE_FAIL = 'google_maps_geocode_fail';

export const MAPS_REVERSE_GEOCODE_REQUEST =
    'google_maps_reverse_geocode_request';
export const MAPS_REVERSE_GEOCODE_SUCCESS =
    'google_maps_reverse_geocode_success';
export const MAPS_REVERSE_GEOCODE_FAIL = 'google_maps_reverse_geocode_fail';

export const placesAutocomplete = input => async dispatch => {
    try {
        dispatch({
            type: MAPS_PLACES_AUTOCOMPLETE_REQUEST,
            payload: input
        });
        const res = await googleMapsClient.placesAutoComplete({
            params: {
                input,
                key: KEY
            }
        });
        if (res.data.error_message) {
            dispatch({
                type: MAPS_PLACES_AUTOCOMPLETE_FAIL,
                error: new Error(res.data.error_message)
            });
        } else {
            dispatch({
                type: MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: MAPS_PLACES_AUTOCOMPLETE_FAIL,
            error
        });
    }
};

export const geocode = props => async dispatch => {
    try {
        dispatch({
            type: MAPS_GEOCODE_REQUEST,
            payload: props
        });
        const res = await googleMapsClient.geocode({
            params: {
                ...props,
                key: KEY
            }
        });
        if (res.data.error_message) {
            dispatch({
                type: MAPS_GEOCODE_FAIL,
                error: new Error(res.data.error_message)
            });
        } else {
            dispatch({
                type: MAPS_GEOCODE_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: MAPS_GEOCODE_FAIL,
            error
        });
    }
};

export const reverseGeocode = props => async dispatch => {
    try {
        dispatch({
            type: MAPS_REVERSE_GEOCODE_REQUEST,
            payload: props
        });
        const res = await googleMapsClient.geocode({
            params: {
                ...props,
                key: KEY
            }
        });
        if (res.data.error_message) {
            dispatch({
                type: MAPS_REVERSE_GEOCODE_FAIL,
                error: new Error(res.data.error_message)
            });
        } else {
            dispatch({
                type: MAPS_REVERSE_GEOCODE_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: MAPS_REVERSE_GEOCODE_FAIL,
            error
        });
    }
};
