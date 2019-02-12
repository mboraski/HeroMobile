import { sanitizeAndValidateName } from '../utils/security';

export default value => {
    let result;
    if (!sanitizeAndValidateName(value)) {
        result = 'Proper names only. Use only letters';
    }
    return result;
};
