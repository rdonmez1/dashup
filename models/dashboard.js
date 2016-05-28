var mongoose = require("mongoose");

var DashboardSchema = new mongoose.Schema({  
  title: { 
    type: String, 
    required: true, 
    trim: true
  },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required:true 
  },
  created_by: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  updated_by: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  created_on: { 
    type: Date, 
    default: Date.now 
  },
  updated_on: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'dashboard' });

DashboardSchema.index({ title: 1, user_id: 1 }, { unique: true });
DashboardSchema.index({ updated_on: -1 });
DashboardSchema.index({ title: "text" }); 
 
var Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = Dashboard; 
