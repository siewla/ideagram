const { albumsRepositories } = require('../repositories/albums');
const { now } = require('moment');

const albumsControllers = {
    getAllAlbums: async (req ,res)=>{
        const data = await albumsRepositories.getAllAlbums();
        res.render('ideagram/main.ejs', { data, currentUser : req.session.currentUser });
    },

    createNewAlbum: async (req, res)=>{
        res.render('ideagram/newAlbum.ejs');
    },

    createAlbum : async (req, res) => {
        try {
            if (Object.keys(req.body).length){
                const album = {
                    'owner': req.session.currentUser.username,
                    'name': req.body.name,
                    'description': req.body.description,
                    'createdAt': new Date(),
                    'images': [{
                        'url':req.body.image,
                        'uploadedBy': req.session.currentUser.username,
                        'uploadedAt':new Date(),
                        'comments': [{
                            'comment': req.body.comment,
                            'commentedBy': req.session.currentUser.username,
                            'commentedAt' : new Date()
                        }]
                    }]
                };
                await albumsRepositories.createAlbum(album);
                return res.redirect('/');
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },

    showAlbumByName : async (req, res)=>{
        const album = await albumsRepositories.getAlbumByName(req.params.albumName);
        res.render('ideagram/showAlbum.ejs', { album, currentUser : req.session.currentUser });
    },

    createNewImage: async (req, res)=>{
        res.render('ideagram/newImage.ejs', { albumName: req.params.albumName });
    },

    createImage : async (req, res)=>{
        try {
            if(Object.keys(req.body).length){
                const imageData =[{
                    'url':req.body.image,
                    'uploadedBy': req.session.currentUser.username,
                    'uploadedAt':new Date(),
                    'comments': [{
                        'comment': req.body.comment,
                        'commentedBy': req.session.currentUser.username,
                        'commentedAt' : new Date()
                    }]
                }];
                await albumsRepositories.addImageToExistingAlbum(req.body.albumName, imageData);
                return res.redirect('/dashboard');
            } else {
                return res.send('Empty Object');
            }
        }catch (err) {
            return res.send(err.message);
        }
    },

    addComment: async (req, res)=>{
        try {
            if(Object.keys(req.body).length){
                const commentData = [{
                    'comment': req.body.comment,
                    'commentedBy': req.session.currentUser.username,
                    'commentedAt' : new Date()
                }]; 
                await albumsRepositories.addCommentToExistingImage(req.body.albumName, req.body.imageID,commentData);
                return res.redirect(`/albums/${req.body.albumName}`);
            } else {
                return res.send('Empty Object');
            }
        }catch (err) {
            return res.send(err.message);
        }
    }
};

module.exports = {
    albumsControllers
};