module.exports = (app) => {
    app.get('/', async (req, res)=>{
        res.render('ideagram/mainpage.ejs');
    });

    app.get('/register', async (req, res)=>{
        res.render('ideagram/registration.ejs');
    });
};
