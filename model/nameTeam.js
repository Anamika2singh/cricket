const mongoose = require('mongoose');
var Schema = mongoose.Schema
var team = new Schema({
 teamName:{type : String},
created  : {type  : Date , default : Date.now()},
updated : {type  : Date, default : Date.now()},
status :{type : Number , default :1}
})
module.exports =  mongoose.model('teams',team);