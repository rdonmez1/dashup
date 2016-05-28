var express = require('express');
var app = express();
var router = express.Router();

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");
var util = require("util");
var Application = require('../models/application');


var multipart = require('connect-multiparty');
var upload = multipart();

var Result = function (items, message) {
    this.items = items || [];
    this.message = message || null;
    this.description = null;  
    this.page_size = 50;
    this.page = 1;
    this.page_count = 1;
    this.total = this.items.length;
}

var projection =  { name:1, category:1, updated_on:1, created_on:1 };

router.get("/", list, function(req, res) {
    res.render("application/index", { items: req.result.items });
});

router.get("/create", function(req, res) {
    res.render("application/create", {});
});

router.get("/edit/:id", details, function(req, res) {
    res.render("application/edit", { item: req.result.items[0] });
});

router.post("/details/:id", details, function(req, res) {
    res.json(req.result);
});

router.post("/list", list, function(req, res) {
    res.json(req.result)
});

router.put("/create", upload, create, function(req, res) {
    res.json(req.result);
});

router.post("/edit/:id", upload, edit, function(req, res) {
    res.json(req.result)
});

router.delete("/remove/:id", remove, function(req, res) {
    res.json(req.result)
});

function create (req, res, next) {
    var app = new Application(req.body);
    app.created_by = req.user.id;
    if(req.files.icon && req.files.icon.size > 0) 
        obj.icon = base64_encode(req.files.icon.path);
    app.save(function (err, doc) {
        req.result = new Result([doc], i18n.app_create_success);
        if(err) next(err);
        else next();
    });
}

function edit (req, res, next) {
    var id = req.params.id;
    var obj = req.body;
    obj.updated_by = req.user.id;
    if(req.files.icon && req.files.icon.size > 0) 
        obj.icon = base64_encode(req.files.icon.path);
    Application.findOneAndUpdate(
        { _id: id },
        { $set: obj }, 
        { $currentDate: { updatedAt: true }, projection: projection, returnNewDocument: true }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.app_edit_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.app_not_found));
            else next();
    });
}

function remove (req, res, next) {
    var id = req.params.id;
    Application.findOneAndRemove(
        { _id: id }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.app_remove_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.app_not_found))
            else next();
    });
}

function list (req, res, next) {
    var category = req.body.category;
    var page = req.body.page || 1;
    var q = req.body.q;
    var page_size = req.body.page_size || 50;
    if(page < 1) page = 1;
    var query = { };
    if(q) query["name"] = { $regex: ""+ q +"", $options: 'i'  }
    if(category) query["category"] = category;
    Application.count(query, function (err, count) {
      Application.find(query, projection)
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
    Application.findOne({ _id: id }, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.app_not_found));
        else {
           req.result = new Result([doc], "");
           next();  
        } 
    });
}
var fs = require('fs');
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;