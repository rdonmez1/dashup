var express = require('express');
var app = express();
var router = express.Router();

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");

var Dashboard = require('../models/dashboard');
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

var projection =  { title:1, updated_on:1, created_on:1 };

/* FRONT */

router.get("/", function(req, res) {
    res.render("dashboard/index", { })
});

router.get("/:id", details, getWidgets, function(req, res) {
    res.render("dashboard/index", {
        metaTitle: req.result.items[0].title,
        dashboard: req.result.items[0],
        widgets: req.widgets
    })
});


/* API */

router.post("/details/:id", details, function(req, res) {
    res.json(req.result);
});

router.post("/list", list, function(req, res) {
    res.json(req.result)
});

router.put("/create", create, function(req, res) {
    res.json(req.result);
});

router.post("/edit/:id", edit, function(req, res) {
    res.json(req.result)
});

router.delete("/remove/:id", remove, function(req, res) {
    res.json(req.result)
});

router.put("/duplicate/:id", duplicate, function(req, res) {
    res.json(req.result)
});

function create (req, res, next) {
    var title = req.body.title;
    var user_id = req.user.id;
    Dashboard.create({ title: title, user_id: user_id }, function (err, doc) {
        req.result = new Result([doc], i18n.dashboard_create_success);
        if(err) next(err);
        else next();
    });
}

function edit (req, res, next) {
    var _id = req.params.id;
    var user_id = req.user.id;
    var title = req.body.title;
    Dashboard.findOneAndUpdate(
        { _id: _id, user_id: user_id }, 
        { $set: { title: title } }, 
        { $currentDate: { updatedAt: true } }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.dashboard_edit_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.dashboard_not_found))
            else next();
    });
}

function remove (req, res, next) {
    var _id = req.params.id;
    var user_id = req.user.id;
    Dashboard.findOneAndRemove(
        { _id: _id, user_id: user_id }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.dashboard_remove_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.dashboard_not_found))
            else next();
    });
}

function duplicate (req, res, next) {
    var _id = req.params.id;
    var user_id = req.user.id;
    var title = req.body.title;
    Dashboard.findOne({ _id: _id, user_id: user_id }, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.dashboard_not_found));
        else {
            var dashboard = new Dashboard();
            dashboard.user_id = user_id;
            if ( title && title != doc.title ) {
            dashboard.title = title;
            dashboard.save(function (err) {
                    req.result = new Result([dashboard], i18n.dashboard_duplicate_success);
                    if (err) next(err);
                    else next();
            });
            } else {
            generateName(doc.title, user_id, function (new_name) {
                    dashboard.title = new_name;
                    dashboard.save(function (err) {
                        req.result = new Result([dashboard], i18n.dashboard_duplicate_success);
                        if (err) next(err);
                        else next();
                    });
            });
            }   
        }
    });
}

function generateName (new_name, user_id, next) {
    Dashboard.findOne({ title: new_name, user_id: user_id }, function (err, doc) {
        if(doc != null) generateName(new_name + " Copy", user_id, next);
        else next(new_name);
    });
}

function list (req, res, next) {
    var page = req.body.page || 1;
    var q = req.body.q;
    var page_size = req.body.page_size || 50;
    if(page < 1) page = 1;
    var query = { user_id: req.user.id };
    if(q) query["title"] = { $regex: ""+ q +"", $options: 'i'  }
    console.log(query)
    Dashboard.count(query, function (err, count) {
      Dashboard.find(query, projection)
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
    Dashboard.findOne({ _id: id, user_id: user_id }, projection, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.dashboard_not_found));
        else {
            req.result = new Result([doc], "");
            next();
        }
    });
}

function getWidgets (req, res, next) {
    var query = { user_id: req.user.id, dashboard_id: req.params.id };
    Widget.find(query, projection)
    .sort({ updated_on: -1 })
    .exec(function (err, docs) {
        if(err) next(err);
        else {
            req.widgets = docs;
            next();
        }
    });
}

module.exports = router;