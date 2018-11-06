export function formatError(error) {
    if (typeof error === 'string') {
        return error;
    }
    if (error.response) {
        return formatError(error.response);
    }
    if (error.data) {
        return formatError(error.data);
    }
    if (error.error) {
        return formatError(error.error);
    }
    if (error.text) {
        return formatError(error.text);
    }
    if (error.message) {
        return formatError(error.message);
    }
    return JSON.stringify(error);
}
