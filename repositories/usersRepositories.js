const db = require('../database');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;

module.exports = {  
    create: async (userData) => {
        try{
            userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(SALT_ROUND));
            const { insertedCount } = await db.users.insertOne(userData);
            if (!insertedCount) throw new Error ('insertion failed');
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify(userData)}`);
        }
    }
};