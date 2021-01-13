const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const player = new Schema({
    team_id : {type:mongoose.Types.ObjectId},
    player_name:{type:String,required:true},
    role:{type:String,required:true},
    profile:{type:String,required:true},
    created  : {type  : Date , default : Date.now()},
    updated : {type  : Date, default : Date.now()},
    status :{type : Number , default :1}
})
module.exports= mongoose.model('teamPlayers',player);