var express = require('express');
var path = require("path");
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session"); 

var passport = require('passport');
var flash    = require('connect-flash');
var compress = require('compression');
var uuid = require("uuid");
var util = require("util");

var config = require("./config/"+ process.env.NODE_ENV +".js");
var helper = require('./lib/helper');
var i18n = require("./i18n/en");

var mongoose = require('mongoose'); 
var MongoStore = require('connect-mongo')(session);

var user = require('./routes/user');
var front = require('./routes/front');
var connect = require('./routes/connect');

var datasource = require('./routes/datasource');
var dashboard = require('./routes/dashboard');
var widget = require('./routes/widget');
var application = require('./routes/application');
var credential = require('./routes/credential');
var data = require('./routes/data');

var ga = require('./routes/ga');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(cookieParser());
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json( { }  ));
app.use(bodyParser.urlencoded({   extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
   secret: "12lkjasdlfjlsakjf",
   resave: true,
   saveUninitialized: true,
   store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(function(req, res, next) {
  res.setHeader("Vary", "User-Agent,Accept-Encoding");
  next();
});
app.use(function (req, res, next) {
  app.locals.user = req.user;
  if(typeof(gc) == "function") gc();
  next();
});

app.use("/", front);
app.use("/user", user);
app.use("/connect", isAuthenticated, connect);
app.use("/dashboard", isAuthenticated, dashboard);
app.use("/widget", isAuthenticated, widget);

// admin
app.use("/application", isAdmin, application);
app.use("/credential", isAdmin, credential);
app.use("/datasource", isAdmin, datasource);
app.use("/data", isAdmin, data);


app.use(function(req, res, next) {
  var err = new Error(i18n.not_found);
  err.stack = i18n.not_found_desc;
  err.status = 404;
  next(err);
});
 

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var message = err.message || "Somethings went wrong!";
    var description = err.stack || "Sorry :( We have encountered an error while proceesing your request. Please try again later. ";
    if(req.xhr || req.headers["content-type"] == "application/json") {
      res.json({ message: message, err: err, description: description });
    } else {
      res.render('error', {
        metaTitle: i18n.error,
        message: message,
        err: err, 
        description: description
      });
    }
  });
  app.locals.pretty=true;
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) { 
  res.status(err.status || 500);
  var message = err.message || "Error! Unexpected error occurred.";
  var description = err.stack || "Sorry :( We have encountered an error while proceesing your request. Please try again later. ";
  if(req.xhr || req.headers["content-type"] == "application/json") {
    res.json({ message: message, err: err, description: description });
  } else {
    res.render('error', {
      metaTitle: i18n.error,
      message: message,
      err: {},
      description: description
    });
  }
});

mongoose.connect('mongodb://'+ config.mongo_host +':'+ config.mongo_port +'/'+ config.mongo_db);

app.locals.metaTitle = "";
app.locals.metaDescription = "";
app.locals.pageTitle = "";
app.locals.pageDecription = "";
app.locals.q = "";
app.locals.hasError = false;
app.locals.message = "";
app.locals.page = 1;
app.locals.pageCount = 1;
app.locals.currentYear = new Date().getFullYear();
app.locals.config = config;
app.locals.util = util;
app.locals.i18n = i18n;
app.locals.dashboard = null;
app.locals.dashboards = [];
app.locals.widget = null;
app.locals.widgets = [];

app.locals.isDefined = function (s) {
  return helper.isDefined(s);
};
app.locals.slug = function (s) {
  return helper.slug(s);
};
app.locals.localeDate = function (d) {
  return helper.localeDate(d);
};
app.locals.formatDate = function (d, s) {
  return helper.formatDate(d, s);
};
app.locals.formatNum = function (n) {
  return helper.formatNum(n);
};
app.locals.formatSize = function (n) {
  return helper.formatSize(n);
};
app.locals.timeDifference = function (d) {
  return helper.timeDifference(d);
};
app.locals.clone = function (a) {
  return helper.clone(a);
};
app.locals.left = function(s,c) {
  return helper.left(s,c);
}
app.locals.capital = function(s) {
  return helper.capital(s);
}

function isAuthenticated (req, res, next) {
  if ( req.user ) return next();
  else res.redirect("/signin?returnUrl="+ encodeURI(req.originalUrl));
}

function isAdmin (req, res, next) {
  if ( req.user && req.user.roles.indexOf("admin") > -1) return next();
  else {
      var err = new Error("Forbidden Access");
      err.stack = "You don't have an access to view this page.";
      err.status = 403;
      next(err);
  }
}

module.exports = app;