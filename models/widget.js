var mongoose = require("mongoose");
var i18n = require("../i18n/en");

var widgetSchema = new mongoose.Schema({  
  title: { type: String, 
    required: [true, i18n.widget_title_required], 
    trim: true,
    min: [3, i18n.widget_title_too_short],
    max: [35, i18n.widget_title_too_long]
  },
  dashboard_id: { type: mongoose.Schema.Types.ObjectId, required:true },
  app_id: { type: mongoose.Schema.Types.ObjectId, required:true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required:true },
  created_by: { type: mongoose.Schema.Types.ObjectId },
  updated_by: { type: mongoose.Schema.Types.ObjectId },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
}, { collection: 'widget' });

widgetSchema.index({ title: 1, dashboard_id: 1 }, { unique: true });
widgetSchema.index({ updated_on: -1 });
widgetSchema.index({ title: "text" }); 
 
var Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget; 
