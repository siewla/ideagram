const { albumsControllers } = require('../controllers/albums');
const { usersControllers } = require('../controllers/users');
const { sessionsControllers } = require('../controllers/sessions');
const { appControllers } = require('../controllers/app');

module.exports = (app) => {
    
    app.get('/', appControllers.homepage); //homepage 

    app.get('/login', sessionsControllers.newLogin); // user login
    app.post('/login', sessionsControllers.login ); // login

    app.get('/signup', usersControllers.signupForm); // signup form
    app.post('/signup', usersControllers.createUser); // create user

    app.use((req, res, next) => {
        if(req.session.currentUser) {
            next();
        } else {
            return res.redirect('/');
        }
    });

    app.delete('/logout', sessionsControllers.logout); // logout
    app.get('/dashboard', albumsControllers.getAllAlbums);
    
    app.get('/albums/new', albumsControllers.createNewAlbum);
    app.get('/albums/:albumName', albumsControllers.showAlbumByName);
    app.post('/albums/create', albumsControllers.createAlbum);

    app.get('/:albumName/image/new', albumsControllers.createNewImage);
    app.post('/image/create',albumsControllers.createImage);
    
    app.post('/comment/create', albumsControllers.addComment);

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
