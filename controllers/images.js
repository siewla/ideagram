const { albumsRepositories } = require('../repositories/albums');
const usersRepositories = require('../repositories/users');
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
            const commentData = [{
                'commentIndex': shortid.generate(),
                'comment': req.query.comment,
                'commentedBy': req.session.currentUser.username,
                'commentedAt' : new Date()
            }]; 
            await albumsRepositories.addCommentToExistingImage(req.params.albumName, req.params.imageIndex, commentData);
            const album = await albumsRepositories.getAlbumByName(req.params.albumName);
            album.updatedAt= new Date();
            album.updatedBy = req.session.currentUser.username;
            await albumsRepositories.updateAlbumByName(req.params.albumName, album);
            const data = await albumsRepositories.getAllAlbums();
            const userData = await usersRepositories.find(req.session.currentUser.username);
            const albumData = await albumsRepositories.getAlbumByName(req.params.albumName);
            return res.end(JSON.stringify({ data, albumData, currentUser : userData, moment: moment  }));
        }catch (err) {
            return res.send(err.message);
        }
    }
};

module.exports = {
    imagesControllers
};


