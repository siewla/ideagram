const appControllers = {
    homepage: (req, res)=>{
        res.render('ideagram/index.ejs', { currentUser : req.session.currentUser });
    },

    aboutPage: async (req, res)=>{
        res.render('ideagram/about.ejs');
    }
};

module.exports = {
    appControllers
};