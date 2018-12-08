var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Ceiba_data = new Schema({
    type : {type: String, required : true},
    measure : [{
        values : {type : Number, required : true},
        date_time : { type : Date, required : true, default : Date.now}
    }]
});

module.exports = mongoose.model('Ceiba_Data',Ceiba_data);