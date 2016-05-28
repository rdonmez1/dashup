var MongoClient = require('mongodb').MongoClient;
var fs = require("fs");
var format = require('util').format;
 
var request = require("request")
var util = require('util'); 
var uuid = require('uuid');
var slug = require('slug');

var config = require("../config/"+ process.env.NODE_ENV +".js");
var helper = require("../lib/helper");

slug.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: true,
    remove: /[.*?=%'!+&]/g,
    lower: true,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
};

var PAGE_SIZE = 50; 

var middleware = {

  render404: function (req, res, next) {
    console.log("not found... "+  req.url);
    var err = new Error("404 Not Found");
    err.status = 404;
    next(err);
  },

  verifyCaptcha: function (req, res, next) {
    var gresponse = req.body["g-recaptcha-response"] || "";
    request.post(config[process.env.NODE_ENV].recaptca_verify_endpoint, 
      { form: { 
        secret: config[process.env.NODE_ENV].recaptcha_secret_key, 
        response: gresponse 
      } }, function(err, response, responseBody) {
        var json = JSON.parse(responseBody); 
        console.log(json)
        if(err) 
          next(new Error("Invalid Captcha"))
        else if(json.success != true)  
          next(new Error("Invalid Captcha"));
        else {
          next();
        }
    });
  }
  
}

module.exports = middleware;

