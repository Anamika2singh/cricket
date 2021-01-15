const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const player = new Schema({
    team_id : {type:mongoose.Types.ObjectId},
    player_name:{type:String,required:true},
    role:{type:String,required:true},
    profile:{type:String,required:true},
    run:{type:Number,default:0},
    balls:{type:Number,default:0},
    four:{type:Number,default:0},
    six:{type:Number,default:0},
    is_played:{type:Number,default:0},
    created  : {type  : Date , default : Date.now()},
    updated : {type  : Date, default : Date.now()},
    status :{type : Number , default :1}
})
module.exports= mongoose.model('teamPlayers',player);