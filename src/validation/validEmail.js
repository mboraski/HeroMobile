import { sanitizeAndValidateEmail } from '../utils/security';

export default value => {
    let result;
    if (
        !sanitizeAndValidateEmail(value) ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
        result = 'Invalid email address';
    }
    return result;
};
