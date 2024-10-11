const model = require('./models/user');
const {validationResults} = require('express-validator');

exports.signup = (req, res)=>{
    res.render('/SignUp');
};

exports.create = (req, res, next)=>{
    let user = new model(req.body);
    if(user.email){
        user.email = user.email.toLowerCase();
    };
    user.save()
    .then(user=> res.redirect('/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/SignUp');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/SignUp');
        }
    
        next(err);
    }); 
};

exports.getUserLogin = (req, res, next) => {
    res.render('Login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    if(email){
        email = email.toLowerCase();
    };
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'Wrong Email Address');  
            res.redirect('/Login');
        } 
        else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in!');
                    res.redirect('/');
                } 
                else {
                    req.flash('error', 'Wrong Password');      
                    res.redirect('/Login');
                }
            });     
        }     
    })
    .catch(err => next(err));
};
