var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName : {type : String, required : true, unique : true},
    password :{type : String, required : true},
    type : {type : String, required : true, default : "common"},
    f_name : {type : String, required : true},
    l_name : {type : String, required : true}
});

module.exports = mongoose.model('User',UserSchema);