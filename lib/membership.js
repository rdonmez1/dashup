var LocalStrategy   = require('passport-local').Strategy;
var uuid = require("uuid");

var User = require('../models/user');
var passport = require("passport");

var config = require("../config/"+ process.env.NODE_ENV +".js");
var helper = require("../lib/helper");
var i18n = require("../i18n/en");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: i18n.incorrect_username_or_password });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: i18n.incorrect_username_or_password });
      }
      return done(null, user);
    });
  }
));

passport.use('local-signin',  new LocalStrategy( 
    { usernameField: "email", passwordField: "password", passReqToCallback: true }, 
    function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) return done(err);
          if (!user) return done(new Error(i18n.incorrect_username_or_password), false, null);
          if (!user.validPassword(password))
            return done(new Error(i18n.incorrect_username_or_password), false, null);
          else return done(null, user);
        });
  })
);

passport.use('forgot-password',  new LocalStrategy( 
    { usernameField: "email", passwordField: "password", passReqToCallback: true }, 
    function (req, email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(new Error(i18n.email_could_not_found), false, null);
            var secret = uuid.v1();
            var emptyUser = new User();
            var newUser = new User();
            newUser = user;
            newUser.secret = secret;
            newUser.save(function(err) {
                if (err) done(err, false, null);
                helper.sendMail(
                    "noreply@dashboard.com", 
                    email, 
                    i18n.forgot_password, 
                    "Your password reset url: http://"+ req.hostname +"/reset-password/"+ secret, 
                    function (err, info) {
                        console.log(err);
                        console.log(info);
                        if(err) return done(err, false, null);
                        else return done(null, emptyUser);
                });
            });
        });
  })
);

passport.use('reset-password',  new LocalStrategy( 
    { usernameField: "email", passwordField: "new_password", passReqToCallback: true }, 
    function (req, email, password, done) {
 
    var new_password = req.body.new_password.trim();
    var new_password_repeat = req.body.new_password_repeat.trim();
    var secret = req.body.secret.trim();   
     
    if(new_password == "" || new_password_repeat == "")
        return done(new Error(i18n.passwords_required));

    if(new_password != new_password_repeat)
        return done(new Error(i18n.passwords_dont_match), false, null);

    User.findOne({ secret : secret }, function (err, user) { 
        if (err) return done(err);
        if (!user) return done(new Error(i18n.secret_invalid), false, null);
        var emptyUser = new User();
        var newUser = new User();
        newUser = user;
        newUser.password = newUser.generateHash(req.body.new_password);
        newUser.secret = null;
        newUser.save(function(err) {
            if (err) throw err;
            return done(null, emptyUser);
        });
    });
    
  })
);

passport.use('email-activation',  new LocalStrategy( 
    { usernameField: "email", passwordField: "code", passReqToCallback: true }, 
    function (req, email, code, done) {
     
    if(code) return done(new Error(i18n.activation_code_invalid));

    User.findOne({ activation_code : code }, function (err, user) { 
        if (err) return done(err);
        if (!user) return done(new Error(i18n.activation_code_invalid), false, null);
        var emptyUser = new User();
        var newUser = user;
        newUser = user;
        newUser.activation_code = null;
        newUser.activated = true;
        newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
        });
    });
    
  })
);

passport.use('local-signup', new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    function (req, email, password, done) {  
        
        var password = req.body.password.trim();
        var password_repeat = req.body.password_repeat.trim();
        var name = req.body.name.trim();
        
        if (password != password_repeat) 
            return done(new Error(i18n.passwords_dont_match), false, null);
            
        User.findOne({ email :  email }, function (err, user) { 
            if (err) return done(err);
            if (user) return done(new Error(i18n.email_taken), false, null);
            var newUser = new User();
            newUser.password = newUser.generateHash(password);
            newUser.name = name;
            newUser.email = email;
            newUser.activation_code = helper.generateGuid();
            newUser.save(function(err) {
                if (err) return done(err, false, null);
                else return done(null, newUser);
            });
        });
}));

passport.use('change-password', new LocalStrategy(
    { usernameField: "email", passwordField: "old_password", passReqToCallback: true },
    function (req, email, password, done) {
    
    var old_password = req.body.old_password.trim();
    var new_password = req.body.new_password.trim();
    var new_password_repeat = req.body.new_password_repeat.trim();
        
    if (new_password != new_password_repeat) 
        return done(new Error(i18n.passwords_dont_match), false, null);
         
    User.findOne({ email :  email }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(new Error(i18n.user_notfound), false, null);
        if (!user.validPassword(password))
            return done(new Error(i18n.old_pass_wrong), false, null);

        var user = new User();
        user = user;
        user.password = user.generateHash(new_password);

        user.save(function(err) {
            if (err) throw err;
            return done(null, user);
        });
        
    });
}));

passport.use('change-email', new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    function (req, email, password, done) {
        
    var new_email = req.body.new_email.trim();
    
    User.findOne({ email : email }, function (err, user) {
        if (err) return done(err);
        if(user==null) return done(new Error(i18n.user_notfound), false, null);
        
        User.findOne({ email : new_email }, function (err, verify) { 
            if (err) return done(err);
            if(verify.email == user.email) return done(new Error(i18n.use_different_email), false, null);
            if (verify != null) return done(new Error(i18n.email_taken), false, null);
            
            user.email = new_email;
            user.save(function(err) {
                if (err) return done(err);
                return done(null, user);
            });
        });
    });
}));

passport.use('change-profile', new LocalStrategy(
    { usernameField: "email", passwordField: "password", passReqToCallback: true },
    function (req, email, password, done) {
        
    var name = req.body.name.trim();
    
    User.findOne({ email : email }, function (err, user) {
        if (err) return done(err);
        if(user==null) return done(new Error(i18n.user_notfound), false, null);
        
        user.name = name;
        user.save(function(err) {
            if (err) return done(err);
            return done(null, user);
        });
    });
}));
 
module.exports = passport;