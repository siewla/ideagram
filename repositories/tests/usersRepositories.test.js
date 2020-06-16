const { expect } = require('chai');
const usersRepositories = require('../usersRepositories');
const db = require('../../database/');

describe('usersRepositories.create', ()=>{
    beforeAll(async ()=>{
        await db.connect();
    });

    afterAll(async ()=>{
        await db.disconnect();
    });

    it('should return true when insert a new object into db collection', async () => {
        const result = await usersRepositories.create({
            'username': 'UserOne',
            'password': '123',
            'createdAt': new Date(),
            'updatedAt': new Date()
        });
        expect(result).to.be.true;
    });
});