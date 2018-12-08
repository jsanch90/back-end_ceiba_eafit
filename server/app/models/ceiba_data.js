var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Ceiba_data = new Schema({
    measure: { type: String, required: true }, // type of device 
    value: { type: Number, required: true },
    date_time: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Ceiba_Data', Ceiba_data);