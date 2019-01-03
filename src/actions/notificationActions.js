export const NEXT_NOTIFICATION = 'next_notification';

export const newNotificaiton = ({ index }) => dispatch =>
    dispatch({ type: NEXT_NOTIFICATION, payload: index + 1 });
