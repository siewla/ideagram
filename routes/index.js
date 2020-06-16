const { albumsControllers } = require('../controllers/albums');

module.exports = (app) => {
    app.get('/', albumsControllers.getAllAlbums);

    app.get('/register', async (req, res)=>{
        res.render('ideagram/registration.ejs');
    });

    app.get('/albums/new', albumsControllers.createNewAlbum);

    app.get('/albums/show', albumsControllers.showAlbum);

    app.post('/albums/create', albumsControllers.createAlbum);

    // app.get('/upload', async (req, res) =>{
    //     res.render('ideagram/uploadMulter.ejs');
    // });

    app.get('/session', (req, res) => {
        let visits = req.session.visits;
        req.session.visits = visits === undefined ? 1 : parseInt( visits ) +1;
        console.log('visits from session:' + visits);
        res.send('Session');
    });

};
