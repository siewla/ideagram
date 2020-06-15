const { albumsRepositories } = require('../repositories/albums');

const albumsControllers = {
    getAllAlbums: async (req ,res)=>{
        const data = await albumsRepositories.getAllAlbums();
        res.render('ideagram/main.ejs', { data });
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
                return res.send(album);
            } else {
                return res.send('Empty Object');
            }
        } catch (err) {
            return res.send(err.message);
        }
    }
};

module.exports = {
    albumsControllers
};