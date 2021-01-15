const mongoose = require('mongoose');
var Schema = mongoose.Schema
var team = new Schema({
 teamName:{type : String},
//  is_bating:{type:Number,default:0},
created  : {type  : Date , default : Date.now()},
updated : {type  : Date, default : Date.now()},
status :{type : Number , default :1}
})
module.exports =  mongoose.model('teams',team);