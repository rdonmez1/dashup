var express = require('express');
var app = express();
var router = express.Router();

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");
var util = require("util");
var Dashboard = require('../models/dashboard');
var Application = require('../models/application');
var Widget = require('../models/widget');

var Result = function (items, message) {
    this.items = items || [];
    this.message = message || null;
    this.description = null;  
    this.page_size = 50;
    this.page = 1;
    this.page_count = 1;
    this.total = this.items.length;
}

var projection =  { title:1, app_id: 1, updated_on:1, created_on:1 };

/* FRONT */


/* API */

router.post("/details/:id", details, function(req, res) {
    res.json(req.result);
});

router.post("/list", list, function(req, res) {
    res.json(req.result)
});

router.put("/create", checkDasboard, checkApp, create, function(req, res) {
    res.json(req.result);
});

router.post("/edit/:id", checkDasboard, checkApp, edit, function(req, res) {
    res.json(req.result)
});

router.delete("/remove/:id", checkDasboard, checkApp, remove, function(req, res) {
    res.json(req.result)
});

function create (req, res, next) {
    var title = req.body.title;
    var user_id = req.user.id;
    var dashboard_id = req.body.dashboard_id;
    var app_id = req.body.app_id;
    Widget.create({ title: title, user_id: user_id, dashboard_id: dashboard_id, app_id: app_id }, function (err, doc) {
        req.result = new Result([doc], i18n.widget_create_success);
        if(err) next(err);
        else next();
    });
}

function edit (req, res, next) {
    var id = req.params.id;
    var user_id = req.user.id;
    var title = req.body.title;
    var dashboard_id = req.body.dashboard_id;
    var app_id = req.body.app_id;
    Widget.findOneAndUpdate(
        { _id: id,  user_id: user_id, dashboard_id: dashboard_id, app_id: app_id  }, 
        { $set: { title: title } }, 
        { $currentDate: { updatedAt: true } }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.widget_edit_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.widget_not_found));
            else next();
    });
}

function remove (req, res, next) {
    var id = req.params.id;
    var user_id = req.user.id;
    var dashboard_id = req.body.dashboard_id;
    Widget.findOneAndRemove(
        { _id: id, user_id: user_id, dashboard_id: dashboard_id, app_id: app_id }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.widget_remove_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.widget_not_found))
            else next();
    });
}

function list (req, res, next) {
    var dashboard_id = req.body.dashboard_id;
    var page = req.body.page || 1;
    var q = req.body.q;
    var page_size = req.body.page_size || 50;
    if(page < 1) page = 1;
    var query = { user_id: req.user.id, dashboard_id: dashboard_id };
    if(q) query["title"] = { $regex: ""+ q +"", $options: 'i'  }
    Widget.count(query, function (err, count) {
      Widget.find(query, projection)
      .sort({ updated_on: -1 })
      .skip( ( page - 1) * page_size )
      .limit(page_size)
      .exec(function (err, docs) {
          if(err) next(err);
          else if(!docs) next(new Error(i18n.no_result_found));
          else {
            var result = new Result();
            result.items = docs;
            result.total = count;
            result.page_count = Math.ceil(count / page_size);
            result.page = page;
            result.page_size = page_size;
            req.result = result;
            next();
          }
      });
    });
}

function details (req, res, next) {
    var id = req.params.id;
    var user_id = req.user.id;
    Widget.findOne({ _id: id, user_id: user_id }, projection, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.widget_not_found));
        else {
           req.result = new Result([doc], "");
           next();  
        } 
    });
}

function checkDasboard (req, res, next) {
    Dashboard.findOne({ _id: req.body.dashboard_id, user_id: req.user.id }, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.dashboard_not_found))
        else next();
    });
}

function checkApp (req, res, next) {
    App.findOne({ _id: req.body.app_id }, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.app_not_found))
        else next();
    });
}

module.exports = router;