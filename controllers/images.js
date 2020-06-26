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
    },

    addComment: async (req, res) => {
        try {
        
            console.log(req.params);
            console.log(req.query.comment);
            // const commentData = [{
            //     'commentIndex': shortid.generate(),
            //     'comment': req.body.comment,
            //     'commentedBy': req.session.currentUser.username,
            //     'commentedAt' : new Date()
            // }]; 
            // await albumsRepositories.addCommentToExistingImage(req.params.albumName, req.params.imageIndex, commentData);
            // const album = await albumsRepositories.getAlbumByName(req.params.albumName);
            // album.updatedAt= new Date();
            // album.updatedBy = req.session.currentUser.username;
            // await albumsRepositories.updateAlbumByName(req.params.albumName, album);
            const data = await albumsRepositories.getAllAlbums();
            const userData = await usersRepositories.find(req.session.currentUser.username);
            return res.end(JSON.stringify({ data, currentUser : userData, moment: moment  }));
        
        }catch (err) {
            return res.send(err.message);
        }
    }
};

module.exports = {
    imagesControllers
};


