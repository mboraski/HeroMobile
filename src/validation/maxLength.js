export default max => value =>
(value && value.length > max ? `Must be less than ${max} characters` : undefined);
