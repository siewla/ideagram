const { albumsControllers } = require('../controllers/albums');
const { usersControllers } = require('../controllers/users');
const { sessionsControllers } = require('../controllers/sessions');
const { appControllers } = require('../controllers/app');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


module.exports = (app) => {
    
    app.get('/nav',(req, res)=>{
        res.render('trynav');
    });
    
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
    app.get('/main', albumsControllers.getAllAlbums);

    app.get('/users/:userName',usersControllers.getUserInfo);
    
    app.get('/albums/new', albumsControllers.createNewAlbum);
    app.get('/albums/:albumName', albumsControllers.showAlbumByName);
    app.put('/albums/:albumName', albumsControllers.updateAlbumByName);
    app.get('/albums/:albumName/edit', albumsControllers.editAlbumByName);
    app.post('/albums/create/file', upload.single('image'),albumsControllers.createAlbumByFile);
    app.post('/albums/create/url', albumsControllers.createAlbumByURL);

    app.get('/:albumName/image/new', albumsControllers.createNewImage);
    app.post('/image/create',upload.single('image'), albumsControllers.createImage);
    app.put('/:updatedUser/:albumName/:imageIndex/:commentIndex', albumsControllers.updateCommentByAlbumName);
    app.get('/:albumName/:imageIndex/:commentIndex', albumsControllers.editComment);
    app.post('/comment/create', albumsControllers.addComment);
    app.post('/album/follow', usersControllers.followAlbum);
    app.post('/album/unfollow', usersControllers.unfollowAlbum);

    app.post('/user/follow', usersControllers.followUser);
    app.post('/user/unfollow', usersControllers.unfollowUser);

    app.get('/following', usersControllers.listAlbumsFollowing);

    app.delete('/:albumName', albumsControllers.deleteAlbumByName);
    app.delete('/:albumName/image/:imageIndex', albumsControllers.deleteImageById);
    app.delete('/:albumName/:imageId/:commentIndex', albumsControllers.deleteCommentById);
    
    app.get('/session', (req, res) => {
        let visits = req.session.visits;
        req.session.visits = visits === undefined ? 1 : parseInt( visits ) +1;
        console.log('visits from session:' + visits);
        res.send('Session');
    });

};
