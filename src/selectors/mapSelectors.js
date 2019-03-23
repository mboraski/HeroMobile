export const getPending = state => state.map.pending;
export const getPredictions = state => state.map.predictions;
export const getSaved = state => state.map.saved;
export const getRegion = state => state.map.region;
export const getAddress = state => state.map.address;
export const getError = state => state.map.error;
export const getCoords = state => state.map.coords;
export const getTimestamp = state => state.map.timestamp;
export const getLocationFeedbackPopupVisible = state =>
    state.map.locationFeedbackPopupVisible;
