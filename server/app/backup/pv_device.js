var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PV_Device = new Schema({
    measure: { type: String, required: true },
    value: { type: Number, required: true },
    date_time: { type: Date, required: true, default: Date.now }

    //T: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    //L: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    // P: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    // H: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    // C1: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    // V1: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    // C2: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}],
    // V2: [{value : {type : Number, required : false}, date_time : {type : Date, required : true, default : Date.now}}]
});

module.exports = mongoose.model('PV_Device', PV_Device);