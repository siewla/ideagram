const { albumsControllers } = require('../controllers/albums');
const { usersControllers } = require('../controllers/users');
const { sessionsControllers } = require('../controllers/sessions');
const { appControllers } = require('../controllers/app');

module.exports = (app) => {
    
    app.get('/', appControllers.homepage); //homepage 

    app.get('/login', sessionsControllers.newLogin); // user login
    app.post('/login', sessionsControllers.login ); // login



    // app.get('/', albumsControllers.getAllAlbums);

    app.get('/register', async (req, res)=>{
        res.render('ideagram/registration.ejs');
    });

    app.get('/albums/new', albumsControllers.createNewAlbum);

    app.get('/albums/show', albumsControllers.showAlbum);

    app.post('/albums/create', albumsControllers.createAlbum);

    // app.get('/upload', async (req, res) =>{
    //     res.render('ideagram/uploadMulter.ejs');
    // });

    app.post('/users/create', usersControllers.createUser);

    app.get('/session', (req, res) => {
        let visits = req.session.visits;
        req.session.visits = visits === undefined ? 1 : parseInt( visits ) +1;
        console.log('visits from session:' + visits);
        res.send('Session');
    });

};
