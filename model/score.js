const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var score = new Schema({
    matchType : {type:String,required:true},
    strikeBname :{type:String,required:true},
    nonstrikeB:{type:String,required:true},
    bowlerN:{type:String,required:true},
    overRun:{type:Number,required:true},
     created  : {type  : Date , default : Date.now()},
     updated : {type  : Date, default : Date.now()},
     status :{type : Number , default :1}
})
module.exports= mongoose.model('scores',score);