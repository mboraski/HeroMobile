const validator = require('validator');

export const sanitizeAndValidateEmail = dirtyEmail => {
    const sanitizedEmail = validator.escape(dirtyEmail);
    const normalizedEmail = validator.normalizeEmail(sanitizedEmail);
    const validEmail = validator.isEmail(normalizedEmail);
    return validEmail ? normalizedEmail : null;
};

export const sanitizeToken = dirtyToken => validator.escape(dirtyToken);

export const sanitizeAndValidateName = dirtyName => {
    const sanitizedName = validator.escape(dirtyName);
    const isAlpha = validator.isAlpha(sanitizedName);
    return isAlpha ? sanitizedName : null;
};

export const sanitizeAndValidatePhoneNumber = dirtyPhoneNumber => {
    const sanitizedPhoneNumber = validator.escape(dirtyPhoneNumber);
    const isPhoneNumber = validator.isMobilePhone(sanitizedPhoneNumber);
    return isPhoneNumber ? sanitizedPhoneNumber : null;
};
