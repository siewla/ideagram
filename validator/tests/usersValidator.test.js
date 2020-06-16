const { expect } = require('chai');
const { validate } = require('../usersValidator');

describe('usersValidator', () => {
    it('should pass validation if i put username and password combination', async () => {
        const result = validate({ username: 'userTest', password:'123' });
        expect(result).to.be.true;
    });
    
});
