module.exports = (app, passport) => {
    app.get('/signin', (req, res, next) => {
        res.render('signin');
    });

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect : '/questions', 
        failureRedirect : '/signin',
        failureFlash : true // allow flash msgs
    }));

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope : 'email' })
    );

    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', {
            failureRedirect : '/signin',
            failureFlash : true
        }), (req, res, next) => {
            req.flash('success', 'Welcome!');
            res.redirect('/questions');
        }
    );

    app.get('/signout', (req, res) => {
        req.logout();
        req.flash('success', 'Successfully signed out');
        res.redirect('/');
    });
};