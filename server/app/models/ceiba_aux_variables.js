var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Ceiba_aux_vars = new Schema({
    variable: { type: String, required: true, unique: true }, // type of device (Socket, Ceiba, etc)
    state: { type: Number, required: true }, // 0 -> off / 1 -> On
    date_time: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Ceiba_aux_vars', Ceiba_aux_vars);