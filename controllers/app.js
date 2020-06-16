const appControllers = {
    homepage: (req, res)=>{
        res.render('ideagram/mainPage.ejs', { currentUser : req.session.currentUser });
    }
};

module.exports = {
    appControllers
};