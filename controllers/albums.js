const { albumsRepositories } = require('../repositories/albums');

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
                    'name': req.body.name,
                    'description': req.body.description,
                    'image': req.body.image
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

    showAlbum : async (req, res)=>{
        res.render('ideagram/showAlbum.ejs');
    }
};

module.exports = {
    albumsControllers
};