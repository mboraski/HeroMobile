const ACTIONS = {
    NEXT_NOTIFICATION: 'next_notification'
};

const newNotificaiton = ({ index }) =>
    (dispatch) =>
        dispatch({ type: ACTIONS.NEXT_NOTIFICATION, payload: index + 1 });

const ACTION_CREATORS = {
    newNotificaiton
};

export default { ...ACTIONS, ...ACTION_CREATORS };
