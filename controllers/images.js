const { albumsRepositories } = require('../repositories/albums');
const usersRepositories = require('../repositories/users');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');
const shortid = require('shortid');

const imagesControllers = {
    getAllImages: async (req ,res)=>{
        const data = await albumsRepositories.getAllAlbums();
        const userData = await usersRepositories.find(req.session.currentUser.username);
        res.render('ideagram/images.ejs', { data, currentUser : userData, moment: moment  });
    }
};

module.exports = {
    imagesControllers
};