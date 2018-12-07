var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName : {type : String, required : false, unique : true},
    password :{type : String, required : false},
    type : {type : String, required : false, default : "common"},
    f_name : {type : String, required : false},
    l_name : {type : String, required : false}
});

module.exports = mongoose.model('User',UserSchema);