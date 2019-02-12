import { sanitizeAndValidatePhoneNumber } from '../utils/security';

export default value => {
    let result;
    if (
        !sanitizeAndValidatePhoneNumber(value) ||
        !/^(0|[1-9][0-9]{9})$/i.test(value)
    ) {
        result = 'Invalid phone number. Must be US with 10 digits';
    }
    return result;
};
