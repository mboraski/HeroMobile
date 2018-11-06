export default value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
        ? 'Password must have at least 8 characters with at least 1 lower case, 1 upper case and 1 digit'
        : undefined;
