var mongoose = require("mongoose");

var CredentialSchema = new mongoose.Schema({  
  name: { 
    type: String, 
    trim: true, 
    required: true 
  },
  type: { 
    type: String, 
    lower: true, 
    trim: true, 
    required: true 
  },
  // oauth2
  auth_url:  { 
    type: String, 
    trim: true },
  access_token_url:  { 
    type: String, 
    trim: true },
  scopes:  { 
    type: [String] 
  },
  client_id: { 
    type: String, 
    trim: true  
  },
  client_secret: { 
    type: String, 
    trim: true 
  },
  redirect_uri: { 
    type: String, 
    trim: true  
  },
  access_type: { 
    type: String, 
    trim: true, 
    default: "offline" },
  response_type: { 
    type: String, 
    trim: true, 
    default: "code" 
  },
  // basic authentication
  username: { 
    type: String, 
    trim: true 
  },
  password: { 
    type: String, 
    trim: true 
  },
  created_on: { 
    type: Date, 
    default: Date.now 
  },
  updated_on: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'credential' });

CredentialSchema.index({ name: 1 }, { unique:true });

var Credential = mongoose.model('Credential', CredentialSchema);

module.exports = Credential; 
