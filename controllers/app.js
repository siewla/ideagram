const appControllers = {
    homepage: (req, res)=>{
        res.render('ideagram/index.ejs', { currentUser : req.session.currentUser });
    }
};

module.exports = {
    appControllers
};