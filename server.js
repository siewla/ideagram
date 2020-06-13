/*------------DEPENDENCIES------------*/ 
const express           = require('express');
const methodOverride    = require('method-override');
const cookieParser      = require('cookie-parser');
const session           = require('express-session');
const app               = express ();
const port              = process.env.PORT || 3000;
// const db                = require('./database');

/*------------MIDDLEWARE------------*/ 
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); //for parsing application/json 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'feedmeseymour', //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false
}));

/*------------Route------------*/
require('./routes')(app);

/*------------LISTENER------------*/ 
// db.connect().then(()=>{
//     app.emit('ready');
// });

app.listen(port, () =>{
    console.log(`IDEAGRAM is listening on port : ${port}`);
});
