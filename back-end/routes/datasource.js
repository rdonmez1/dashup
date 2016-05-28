var express = require('express');
var app = express();
var router = express.Router();

var helper = require("../lib/helper");
var middleware = require("../lib/middleware");
var config = require("../config/"+ process.env.NODE_ENV +".js");

var DataSource = require("../models/datasource");
var Credential = require("../models/credential");

var Result = function (items, message) {
    this.items = items || [];
    this.message = message || null;
    this.description = null;  
    this.page_size = 50;
    this.page = 1;
    this.page_count = 1;
    this.total = this.items.length;
}

var projection =  { name:1, credential:1, created_on: 1, updated_on:1 };

router.get("/", list, function (req, res) {
    res.render("datasource/index", { items: req.result.items });
});

router.get("/create", function (req, res) {
    res.render("datasource/create", {  });
});

router.get("/edit/:id", details, getCredential, function (req, res) {
    res.render("datasource/edit", { item: req.result.items[0] });
});

router.get("/details/:id", details, getCredential, function(req, res) {
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

function create (req, res, next) {
    var user_id = req.user.id;
    var obj = req.body;
    DataSource.create(obj, function (err, doc) {
        req.result = new Result([doc], i18n.request_create_success);
        if(err) next(err);
        else next();
    });
}

function edit (req, res, next) {
    var id = req.params.id;
    var user_id = req.user.id;
    var obj = req.body;
    DataSource.findOneAndUpdate(
        { _id: id }, 
        { $set: obj }, 
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
    DataSource.findOneAndRemove(
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
    DataSource.count(query, function (err, count) {
      DataSource.find(query, projection)
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
    DataSource.findOne({ _id: id }, function (err, doc) {
        if(err) next(err);
        else if(!doc) next(new Error(i18n.request_not_found));
        else {
           req.result = new Result([doc], "");
           next();  
        } 
    });
}

function getCredential (req, res, next) {
    
    Credential.findOne({ _id: req.result.items[0].credential_id }, function (err, doc) {
        console.log(doc)
         req.result.items[0].credential = doc;
         next();
    });
}


module.exports = router;