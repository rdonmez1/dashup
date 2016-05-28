var mongoose = require("mongoose");
var i18n = require("../i18n/en");

var DataSchema = new mongoose.Schema({  
  application_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  name: { 
    type: String,
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    trim: true, 
    required: true,
    max: 170
  },
  datasources: { 
    type: [String], 
    required: true
  },
  screenshot: { 
    type: String 
  },
  metrics: { },
  dimensions: { },
  created_on: { 
    type: Date, 
    default: Date.now 
  },
  updated_on: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'data' });

DataSchema.index({ name: 1 }, { unique:true });

var Data = mongoose.model('Data', DataSchema);

module.exports = Data; 
