const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var scorecard= new Schema({
    batsman:{type:Array},
    created  : {type  : Date , default : Date.now()},
    updated : {type  : Date, default : Date.now()},
    status :{type : Number , default :1}
})
module.exports= mongoose.model('playerscores',scorecard);