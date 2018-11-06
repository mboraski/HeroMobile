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

export { getFormattedAddress, getLocation };
