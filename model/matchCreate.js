const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var match = new Schema({
     match_location:{type:String},
     match_name:{type:String},
     team1_id:{type:mongoose.Types.ObjectId},
     team2_id:{type:mongoose.Types.ObjectId},
      match_date:{type:Date},
     created  : {type  : Date , default : Date.now()},
     updated : {type  : Date, default : Date.now()},
     status :{type : Number , default :1}
})
module.exports= mongoose.model('matches',match);