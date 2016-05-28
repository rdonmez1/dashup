var mongoose = require("mongoose");

var DataSourceSchema = new mongoose.Schema({  
  name:   { 
    type: String,
    required:  true, 
    trim: true
  },
  description: { 
      type: String, 
      trim: true 
  },
  credential_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true 
  },
  url: { 
      type: String, 
      trim: true, 
      required: true 
  },
  method: { 
      type: String, 
      trim: true, 
      uppercase: true, 
      required: true 
  },
  request:  {  },
  response: {  },
  created_on: { 
    type: Date, 
    default: Date.now 
  },
  updated_on: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'datasource' });

DataSourceSchema.index({ name: 1 }, { unique:true });

var DataSource = mongoose.model('DataSource', DataSourceSchema);

module.exports = DataSource; 
