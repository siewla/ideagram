const ajv = require('ajv');
const Ajv = new ajv({
    useDefault: true,
    coerceTypes: true,
    allErrors: true
});

const User = require('./schema/users');
const validator = Ajv.compile(User);

module.exports = {
    validate (data){
        const isValid = validator(data);
        if (!isValid){
            console.log(`Validator Errors: ${validator.errors}` );
        }
        data.createdAt = data.createdAt ? new Date (data.createdAt): new Date ();
        data.updatedAt = data.updatedAt ? new Date (data.updatedAt): new Date ();
        return isValid;
    }
};