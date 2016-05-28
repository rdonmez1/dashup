var mongoose = require("mongoose");
var i18n = require("../i18n/en");

var ApplicationSchema = new mongoose.Schema({  
  name: { 
    type: String,
    required: true, 
    trim: true
  },
  description: { 
    type: String,
    required: true, 
    trim: true,
  },
  icon: { 
    type: String 
  },
  category: { 
    type: String,
    required: true, 
    trim: true,
    lower: true,
    validate: {
      validator: function(v) {
        return /^[^\s][a-z0-9-_]+$/.test(v);
      },
      message: "category invalid. must be alpha numeric"
    } 
  },
  created_on: { 
    type: Date, 
    default: Date.now },
  updated_on: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'application' });

ApplicationSchema.index({ name: 1 }, { unique:true });

var Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application; 
