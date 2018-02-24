export default min => value =>
    (value && value.length < min ? `Must be ${min} characters or more` : undefined);
