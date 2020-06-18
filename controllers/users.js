const usersRepository = require('../repositories/usersRepositories');

const usersControllers = {
    signupForm : (req , res)=>{
        res.render('users/signup.ejs', { error:false });
    },

    createUser : async (req, res) => {
        try {
            if (Object.keys(req.body).length){
                const data = {
                    'username': req.body.username,
                    'password': req.body.password,
                    'createdAt': new Date(),
                    'updatedAt': new Date()
                };
                await usersRepository.create(data);
                req.session.currentUser = data;
                return res.redirect('/');
            } else {
                const errorMSg = 'Empty Object';
                return res.render('users/signup.ejs', { error: errorMSg });
            }
        } catch (err) {
            return res.render('users/signup.ejs', { error: err.message });
        }
    }
};

module.exports = {
    usersControllers
};