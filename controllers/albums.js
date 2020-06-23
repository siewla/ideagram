const { albumsRepositories } = require('../repositories/albums');
const usersRepositories = require('../repositories/users');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');
const shortid = require('shortid');


const albumsControllers = {
    getAllAlbums: async (req ,res)=>{
        const data = await albumsRepositories.getAllAlbums();
        const userData = await usersRepositories.find(req.session.currentUser.username);
        
        for(const album of data){
            const count = await usersRepositories.countAlbumFollowers(album.name);
            album.followersCount=count; 
        }
        
        res.render('ideagram/dashboard.ejs', { data, currentUser : userData, moment: moment  });
    },

    createNewAlbum: async (req, res)=>{
        res.render('ideagram/newAlbum.ejs',{ error:false, 
            currentUser : req.session.currentUser });
    },

    createAlbumByFile : async (req, res) => {
        try {
            await cloudinary.uploader.upload(req.file.path,
                async (err, result) => {
                    if(Object.keys(req.body).length){
                        const album = {
                            'owner': req.session.currentUser.username,
                            'name': req.body.name,
                            'description': req.body.description,
                            'createdAt': new Date(),
                            'images': [{
                                'url':result.url,
                                'id':result.public_id,
                                'uploadedBy': req.session.currentUser.username,
                                'uploadedAt':new Date(),
                                'comments': [{
                                    'commentIndex': shortid.generate(),
                                    'comment': req.body.comment,
                                    'commentedBy': req.session.currentUser.username,
                                    'commentedAt' : new Date()
                                }]
                            }]
                        }; 
                        try{
                            await albumsRepositories.createAlbum(album);
                            return res.redirect('/dashboard');
                        }catch (err) {
                            return res.render('ideagram/newAlbum.ejs', { error: err.message });
                        }
                    } else {
                        throw new Error ('Empty Object');
                    }
                }
            );
        }catch (err) {
            return res.render('ideagram/newAlbum.ejs', { error: err.message, currentUser:req.session.currentUser });
        }    
    },

    createAlbumByURL : async (req, res) => {
        try {
            await cloudinary.uploader.upload(req.body.image,
                async (err, result) => {
                    if(Object.keys(req.body).length){
                        const album = {
                            'owner': req.session.currentUser.username,
                            'name': req.body.name,
                            'description': req.body.description,
                            'createdAt': new Date(),
                            'images': [{
                                'url':result.url,
                                'id':result.public_id,
                                'uploadedBy': req.session.currentUser.username,
                                'uploadedAt':new Date(),
                                'comments': [{
                                    'commentIndex': shortid.generate(),
                                    'comment': req.body.comment,
                                    'commentedBy': req.session.currentUser.username,
                                    'commentedAt' : new Date()
                                }]
                            }]
                        }; 
                        try{
                            await albumsRepositories.createAlbum(album);
                            return res.redirect('/dashboard');
                        }catch (err) {
                            return res.render('ideagram/newAlbum.ejs', { error: err.message });
                        }
                    } else {
                        throw new Error ('Empty Object');
                    }
                }
            );
        }catch (err) {
            return res.render('ideagram/newAlbum.ejs', { error: err.message, currentUser:req.session.currentUser });
        }    
    },

    showAlbumByName : async (req, res)=>{
        const album = await albumsRepositories.getAlbumByName(req.params.albumName);
        res.render('ideagram/showAlbum.ejs', { album, currentUser : req.session.currentUser, moment: moment });
    },

    createNewImage: async (req, res)=>{
        res.render('ideagram/newImage.ejs', { albumName: req.params.albumName, 
            error:false, 
            currentUser : req.session.currentUser });
    },

    createImage : async (req, res)=>{
        try {await cloudinary.uploader.upload(req.file.path,
            async (err, result) => {
                const imageData =[{
                    'url':result.url,
                    'id':result.public_id,
                    'uploadedBy': req.session.currentUser.username,
                    'uploadedAt':new Date(),
                    'comments': [{
                        'comment': req.body.comment,
                        'commentedBy': req.session.currentUser.username,
                        'commentedAt' : new Date()
                    }]
                }];
                try{
                    await albumsRepositories.addImageToExistingAlbum(req.body.albumName, imageData);
                    return res.redirect('/dashboard');
                }catch (err) {
                    res.send(err.message);
                }
            }
        );
        }catch (err) {
            return res.send(err.message);
        }
    },

    addComment: async (req, res)=>{
        try {
            if(Object.keys(req.body).length){
                const album = await albumsRepositories.getAlbumByName(req.body.albumName);
                const imageIndex = req.body.imageID;
                
                const commentData = [{
                    'commentIndex': shortid.generate(),
                    'comment': req.body.comment,
                    'commentedBy': req.session.currentUser.username,
                    'commentedAt' : new Date()
                }]; 
                await albumsRepositories.addCommentToExistingImage(req.body.albumName, req.body.imageID, commentData);
                return res.redirect(`/albums/${req.body.albumName}`);
            } else {
                return res.send('Empty Object');
            }
        }catch (err) {
            return res.send(err.message);
        }
    },

    deleteAlbumByName: async (req, res)=>{
        try { 
            const album = await albumsRepositories.getAlbumByName(req.params.albumName);
            album.images.forEach(image =>
                cloudinary.uploader.destroy(image.id)
            );
        
            await usersRepositories.deleteAlbumFromFollowing(req.params.albumName);
            await albumsRepositories.deleteAlbumByName(req.params.albumName);
            return res.redirect('/dashboard');
        } catch (err) {
            return res.send(err.message);
        }
    },

    deleteImageById: async (req, res)=>{
        try {
            const album = await albumsRepositories.getAlbumByName(req.params.albumName);
            const imageIndex = req.params.imageIndex;
            cloudinary.uploader.destroy(album.images[imageIndex].id);
            await albumsRepositories.deleteImageById(req.params.albumName, album.images[imageIndex].id);
            return res.redirect('/dashboard');
        } catch (err) {
            return res.send(err.message);
        }
    },

    deleteCommentById: async (req, res)=>{
        try{
            const imageId = req.params.imageId;
            const commentId = req.params.commentIndex;
            await albumsRepositories.deleteCommentById(req.params.albumName, imageId, commentId);
            return res.redirect(`/albums/${req.params.albumName}`);
        }catch (err) {
            res.send(err.message);
        }
    }
};

module.exports = {
    albumsControllers
};