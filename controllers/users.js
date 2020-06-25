const usersRepository = require('../repositories/users');
const { albumsRepositories } = require('../repositories/albums');
const moment = require('moment');

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
                    'updatedAt': new Date(),
                    'albumsFollowing': [],
                    'usersFollowing': []
                };
                await usersRepository.create(data);
                req.session.currentUser = data;
                return res.redirect('/');
            } else {
                const errorMsg = 'Empty Object';
                return res.render('users/signup.ejs', { error: errorMsg });
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
                return res.redirect(`/albums/${req.body.albumName}`); 
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },

    unfollowAlbum: async (req, res)=>{
        try{
            if (Object.keys(req.body).length){
                const userName = req.session.currentUser.username;
                await usersRepository.unFollowingAlbum(userName, req.body.albumName);
                return res.redirect(`/albums/${req.body.albumName}`); 
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },

    listAlbumsFollowing: async (req, res) => {
        const userData =  await usersRepository.find(req.session.currentUser.username);
        res.render('ideagram/following.ejs', { userData, currentUser:req.session.currentUser });
    },

    getUserInfo: async (req, res) => {
        const userData =  await usersRepository.find(req.params.userName);
        const data = await albumsRepositories.getAllAlbums();
        const currentUserData = await usersRepository.find(req.session.currentUser.username);
        res.render('ideagram/showUser.ejs', { data, userData, currentUser:currentUserData, moment: moment  });
    },

    getUserProfile: async (req, res) => {
        const userData =  await usersRepository.find(req.session.currentUser.username);
        const data = await albumsRepositories.getAllAlbums();
        const currentUserData = await usersRepository.find(req.session.currentUser.username);
        res.render('ideagram/myaccount.ejs', { data, userData, currentUser:currentUserData, moment: moment  });
    },

    followUser: async (req, res)=>{
        try{
            if (Object.keys(req.body).length){
                const userName = req.session.currentUser.username;
                await usersRepository.addFollowingUser(userName, req.body.userName);
                res.redirect(`/users/${req.body.userName}`);
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },

    unfollowUser: async (req, res)=>{
        try{
            if (Object.keys(req.body).length){
                const userName = req.session.currentUser.username;
                await usersRepository.unfollowUser(userName, req.body.userName);
                res.redirect(`/users/${req.body.userName}`);
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },
};

module.exports = {
    usersControllers
};