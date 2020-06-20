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
    },

    followAlbum: async (req, res)=>{
        try{
            if (Object.keys(req.body).length){
                const userName = req.session.currentUser.username;
                await usersRepository.addFollowingAlbum(userName, req.body.albumName);
                return res.redirect('/dashboard'); 
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },

    listAlbumsFollowing: async (req, res) => {
        const userData =  await usersRepository.find(req.session.currentUser.username);
        res.render('ideagram/following.ejs', { userData, currentUser : req.session.currentUser });
    }

};

module.exports = {
    usersControllers
};