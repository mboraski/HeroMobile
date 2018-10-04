import { REHYDRATE } from 'redux-persist/lib/constants';

import {
    GET_CURRENT_LOCATION_REQUEST,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_ERROR
} from '../actions/mapActions';

import { INVENTORY_SUCCESS } from '../actions/contractorActions';

const initialState = {
    pending: false,
    coords: null, // This is the user's location
    timestamp: null,
    error: null
};

export default function(state = initialState, action) {
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
        case GET_CURRENT_LOCATION_REQUEST:
            return {
                ...state,
                pending: true
            };
        case GET_CURRENT_LOCATION_SUCCESS:
            return {
                ...state,
                pending: false,
                coords: action.payload.coords,
                timestamp: action.payload.timestamp
            };
        case GET_CURRENT_LOCATION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case INVENTORY_SUCCESS:
            return {
                ...state,
                coords: action.payload.region
            };
        default:
            return state;
    }
}
