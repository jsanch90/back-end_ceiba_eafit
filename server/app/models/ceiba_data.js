var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ceiba_data = new Schema({
    measure : [{
        type: {type : String, required : true},
        values : {type : Number, required : true},
        date_time : { type : Date, required : true}
    }]
});

module.exports = mongoose.model('Ceiba_Data',Ceiba_data);