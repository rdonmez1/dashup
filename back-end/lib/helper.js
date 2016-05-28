var request = require("request");
var util = require('util'); 
var uuid = require('uuid');
var request = require("request");
var nodemailer = require("nodemailer");
var fs = require("fs");
var format = require('util').format;
var config = require("../config/"+ process.env.NODE_ENV +".js");
var dateFormat = require('dateformat');
var numeral = require("numeral");
var slug = require('slug');
var nodemailer = require("nodemailer");
var uuid = require("uuid"); 

slug.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: true,
    remove: /[.*?=%'!+&]/g,
    lower: true,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
};

var current = new Date();
var yesterday = new Date();
yesterday.setDate(current.getDate() - 1);
var today = new Date(current.getFullYear(), current.getMonth(), current.getDate());

var helper = {

  isDefined: function(s) {
    return s && s != null && s != undefined && s != "";
  },
  
  generateGuid: function(s) {
    return uuid.v1();
  },

  slug: function (s) {
    return slug(s);
  },

  localeDate: function (d) {
    return d.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  },

  formatDate: function (d, s) {
    return dateFormat(d, s);
  },

  formatNum: function (n) {
    return numeral(n).format('0,0');
  },

  formatSize: function (n) {
    return numeral(n).format('0.0b');
  },

  timeDifference: function (d) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed =  new Date() - Date.parse(d);
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
        return '' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    else if (elapsed < msPerYear) {
        return '' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
        return '' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  },

  clone: function (a) {
    return JSON.parse(JSON.stringify(a));
  },

  IsJsonString: function (str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  },

  left: function (s,c) {
    if( s && s.length > c ) return s.substring(0, c) +"...";
    else return s;
  },

  capital: function (s) {
      if(!s) return "";
      else return s.substring(0,1).toUpperCase() + s.substring(1);
  },

  getLetters: function () { 
    var letters = [];
    for(var i = 65; i <= 90; i++) { 
      letters.push({
          link: String.fromCharCode(i).toLowerCase(),
          text: String.fromCharCode(i),
          s: String.fromCharCode(i)
      })
    }
    for(var i = 48; i <= 57; i++) { 
      letters.push({
          link: String.fromCharCode(i).toLowerCase(),
          text: String.fromCharCode(i),
          s: String.fromCharCode(i)
      })
    }
    console.log("letters:" + letters.length);
    return letters;
  },

  sendMail: function (from, to, subject, message, next) { 
     
    var transporter = nodemailer.createTransport({
        service: 'Mandrill',
        auth: {
            user: config[process.env.NODE_ENV].smtp_user,
            pass: config[process.env.NODE_ENV].smtp_pass
        }
    });

    var mailOptions = {
        from: from,  
        to: to,
        subject: subject,
        text: message
    }; 

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) next(err, info);
        else next(err, info);
    });
  },
}


Array.prototype.getUnique = function(){
  var n = []; 
  for(var i = 0; i < this.length; i++) 
  {
    if (n.indexOf(this[i].toLowerCase()) == -1) n.push(this[i].toLowerCase());
  }
  return n;
}

module.exports = helper;
