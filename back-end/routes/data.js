var express = require('express');
var app = express();
var router = express.Router();

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");
var i18n = require("../i18n/en");

var DataSource = require("../models/datasource");
var Data = require("../models/data");
var Application = require("../models/application");

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

var projection =  { lang: 1, name:1, created_on: 1, updated_on:1 };

router.get("/", list, function (req, res) {
    res.render("data/index", { items: req.result.items });
});

router.get("/create", function (req, res) {
    res.render("data/create", { });
});

router.get("/edit/:id", details, getApplication, function (req, res) {
    res.render("data/edit", { item: req.result.items[0] });
});

router.get("/details/:id", details, getApplication, function(req, res) {
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

    if(req.files.screenshot && req.files.screenshot.size > 0) {
        req.body.screenshot = base64_encode(req.files.screenshot.path);
        remove_file(req.files.screenshot.path);
    }
    
    req.body.datasources = req.body.datasources.split(",");
    
    Data.create(req.body, function (err, doc) {
        req.result = new Result([doc], i18n.request_create_success);
        if(err) next(err);
        else next();
    });
}

function edit (req, res, next) {
    var id = req.params.id;

    if(req.files.screenshot && req.files.screenshot.size > 0) {
        req.body.screenshot = base64_encode(req.files.screenshot.path);
        remove_file(req.files.screenshot.path);
    }

    req.body.datasources = req.body.datasources.split(",");

    Data.findOneAndUpdate(
        { _id: id }, 
        { $set: req.body }, 
        { $currentDate: { updatedAt: true } }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.request_edit_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.request_not_found));
            else next();
    });
}

function remove (req, res, next) {
    var id = req.params.id;
    Data.findOneAndRemove(
        { _id: id }, 
        function (err, doc) {
            req.result = new Result([doc], i18n.request_remove_success);
            if(err) next(err);
            else if(!doc) next(new Error(i18n.request_not_found))
            else next();
    });
}

function list (req, res, next) {
    var page = req.body.page || 1;
    var q = req.body.q;
    var page_size = req.body.page_size || 50;
    if(page < 1) page = 1;
    var query = { };
    if(q) query["name"] = { $regex: ""+ q +"", $options: 'i'  }
    Data.count(query, function (err, count) {
      Data.find(query, projection)
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
    Data.findOne({ _id: id }, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.request_not_found));
        else {
           req.result = new Result([doc], "");
           next();  
        } 
    });
}

function getApplication (req, res, next) {
    console.log(req.result.items[0])
    Application.findOne({ _id: req.result.items[0].application_id }, function (err, doc) {
       req.result.items[0].application = doc;
       next();  
    });
}

var fs = require('fs');
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function remove_file(file) {
    fs.unlinkSync(file);
}

module.exports = router;