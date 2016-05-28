var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var i18n = require("../i18n/en");

var userSchema = mongoose.Schema({
    email: { 
        type: String,  
        trim: true,
        max: [129, i18n.user_email_too_long],
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: i18n.user_email_invalid
        } 
    },
    password: { 
        type: String, 
        required: [true, i18n.user_password_required], 
        trim: true,
        validate: {
            validator: function(v) {
                //return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(v);
                return true;
            },
            message: i18n.user_password_invalid
       }
    },
    name : {
        type: String,
        required: [true, i18n.user_name_required], 
        trim: true,
        max: [35, i18n.user_name_too_long]
    },
    title: { 
        type: String,
        trim: true,
        max: [35, i18n.user_title_too_long]
    },
    preferences: { },
    roles: [String],
    activation_code: { type: String }, 
    activated: { type: Boolean, default: false }, 
    secret: String,
    last_login: { type: Date, default: Date.now },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }
}, { collection: 'user' });
 
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
 
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
 
userSchema.index({ email: 1 }); 
userSchema.index({ last_login: -1 });
userSchema.index({ updated_on: -1 });

var User = mongoose.model('User', userSchema);

module.exports = User;