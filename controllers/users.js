const { usersRepositories } = require('../repositories/usersRepositories');

const usersControllers = {
    createUser : async (req, res) => {
        try {
            if (Object.keys(req.body).length){
                await usersRepositories.create(req.body);
                return res.send('success');
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    }
};

module.exports = {
    usersControllers
};