const usersRepositories = require('../repositories/usersRepositories');
const bcrypt = require('bcrypt');

const sessionsControllers = {
    newLogin : async (req, res)=>{
        return res.render('sessions/login.ejs', { error:false });
    },

    login : async (req, res)=>{
        try {
            const user = await usersRepositories.find(req.body.username);
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user;
                return res.redirect('/');
            } else {
                throw new Error('invalid password');
            }
        } catch (err) {
            return res.render('sessions/login.ejs', { error: err.message });
        }
    },

    logout: (req, res) => {
        return req.session.destroy(() =>{
            res.redirect('/');
        });
    }
};

module.exports = {
    sessionsControllers
};