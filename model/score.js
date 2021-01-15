const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var score = new Schema({
    match_Id: {type:mongoose.Types.ObjectId},
    player1_Id :{type:mongoose.Types.ObjectId},
    player2_Id:{type:mongoose.Types.ObjectId},
    bowler_Id:{type:mongoose.Types.ObjectId},
    over:{type:Number},
    run:{type:Number},
    player1_run:{type:Number},
    player2_run:{type:Number},
    created  : {type  : Date , default : Date.now()},
    updated : {type  : Date, default : Date.now()},
    status :{type : Number , default :1}
})
module.exports= mongoose.model('scores',score);