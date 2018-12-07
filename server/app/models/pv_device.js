var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PV_Device = new Schema({
    measure: { type: String, required: true },
    value: { type: Number, required: true },
    date_time: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('PV_Device', PV_Device);