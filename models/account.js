var mongoose = require("mongoose");
var i18n = require("../i18n/en");

var accountSchema = new mongoose.Schema({  
  auth_code : { 
    type: String,
    trim: true,
  },
  access_token: { 
    type: String, 
    trim: true,
  },
  refresh_token: { 
    type: String, 
    trim: true,
  },
  token_type: { 
    type: String, 
    trim: true,
  },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
  },
  app: { 
    type: String, 
    trim: true,
    lower: true
  },
  expires_on: { type: Date, default: Date.now },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
}, { collection: 'account' });
 
accountSchema.index({ access_token: 1 }, { unique: true });
accountSchema.index({ user_id: 1, app: 1 }, { unique: true });


var Account = mongoose.model('Account', accountSchema);

module.exports = Account; 
