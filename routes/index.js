

module.exports = (app) => {
    app.get('/', async (req, res)=>{
        res.render('ideagram/mainpage.ejs');
    });

    app.get('/register', async (req, res)=>{
        res.render('ideagram/registration.ejs');
    });

    app.get('/cookie', (req, res) => {
        // get the currently set cookie
        let visits = req.cookies['visits'] === undefined ? 0 : req.cookies['visits'].value;
    
        // see if there is a cookie
        if( visits === undefined ){
    
            // set a default value if it doesn't exist
            visits = 1;
        }else{
    
            // if a cookie exists, make a value thats 1 bigger
            visits = parseInt( visits ) + 1;
        }

        console.log('visits:' + visits);
    
        // set the cookie
        res.cookie('visits', { value: visits } , { expires: new Date(Date.now() + 900000), httpOnly: true });
        // res.cookie('visits', visits);
        res.send('Good morning');
    });

};
