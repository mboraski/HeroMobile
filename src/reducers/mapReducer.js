import { REHYDRATE } from 'redux-persist/lib/constants';
import {
    MAPS_PLACES_AUTOCOMPLETE_REQUEST,
    MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
    MAPS_PLACES_AUTOCOMPLETE_FAIL,
    MAPS_GEOCODE_REQUEST,
    MAPS_GEOCODE_SUCCESS,
    MAPS_GEOCODE_FAIL,
    MAPS_REVERSE_GEOCODE_REQUEST,
    MAPS_REVERSE_GEOCODE_SUCCESS,
    MAPS_REVERSE_GEOCODE_FAIL
} from '../actions/googleMapsActions';

import {
    SAVE_ADDRESS,
    SET_REGION,
    GET_CURRENT_LOCATION_REQUEST,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_ERROR
} from '../actions/mapActions';

function getFormattedAddress(payload) {
    const result = payload.results[0];
    if (result) {
        return result.formatted_address;
    }
    return '';
}

function getLocation(payload) {
    const result = payload.results[0];
    if (result) {
        return {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng
        };
    }
    return {};
}

export const initialState = {
    pending: false,
    predictions: [],
    saved: [],
    region: null,
    address: null,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REHYDRATE:
            if (action.payload && action.payload.map) {
                return {
                    ...state,
                    ...action.payload.map,
                    predictions: []
                };
            }
            return state;
        case MAPS_PLACES_AUTOCOMPLETE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_PLACES_AUTOCOMPLETE_SUCCESS:
            return {
                ...state,
                pending: false,
                predictions: action.payload.predictions || [],
                error: null
            };
        case MAPS_PLACES_AUTOCOMPLETE_FAIL:
            return {
                ...state,
                pending: false,
                predictions: [],
                error: action.error
            };
        case MAPS_GEOCODE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_GEOCODE_SUCCESS:
            return {
                ...state,
                pending: false,
                region: {
                    ...state.region,
                    ...getLocation(action.payload)
                }
            };
        case MAPS_GEOCODE_FAIL:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case MAPS_REVERSE_GEOCODE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_REVERSE_GEOCODE_SUCCESS:
            return {
                ...state,
                pending: false,
                address: getFormattedAddress(action.payload)
            };
        case MAPS_REVERSE_GEOCODE_FAIL:
            return {
                ...state,
                pending: false,
                address: '',
                error: action.error
            };
        case SAVE_ADDRESS:
            return {
                ...state,
                saved: !state.saved.includes(action.payload) ? [...state.saved, action.payload] : state.saved,
                address: action.payload
            };
        case SET_REGION:
            return {
                ...state,
                region: {
                    ...state.region,
                    ...action.payload
                }
            };
        case GET_CURRENT_LOCATION_REQUEST:
            return {
                ...state,
                pending: true
            };
        case GET_CURRENT_LOCATION_SUCCESS:
            return {
                ...state,
                pending: false
            };
        case GET_CURRENT_LOCATION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}
