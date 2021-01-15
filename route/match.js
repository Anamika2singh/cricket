const express =  require('express');
var router =  express.Router();
const mongoose= require('mongoose');
const teamNmodel = require('../model/nameTeam');
const multer= require('multer');
const playerModel =  require('../model/teamP');
// const scoremodel = require('../model/score');
const matchModel = require('../model/matchCreate');
const playerscoreModel= require('../model/playerscore');
mongoose.set('useFindAndModify', false);
// const jwt = require('jsonwebtoken');
// const bcrypt =  require('bcrypt');
const { Validator } = require('node-input-validator');
const { validate, findOne } = require('../model/nameTeam');
router.post('/teamN',async(req,res,next)=>{
    try{
    console.log(req.body);
    const v= new Validator(req.body,{
        teamName:'required'
    })
    const matched = await v.check()
    let teamName_message=v.errors.teamName?v.errors.teamName.message:"";
    if (!matched) {
        res.status(422).json({ statusCode: 422, message: teamName_message})
        return;
     }
     else{
      let duplicate= await teamNmodel.findOne({'teamName':req.body.teamName})
       if(duplicate){
        res.status(400).json({statusCode:400,message:"this team already added"})
       }
           else{
            let result = await teamNmodel.create({ 
                teamName:req.body.teamName
            })
            console.log(result);
            if(result){
                res.status(200).json({statusCode:200,message:"team added",result});
                return;
            }

                res.status(400).json({statusCode:400,message:"something went wrong"});
             
           }
     }
    }
    catch(e){
        console.log(e);
    }
})
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,  Date.now()+file.originalname )
    }
})
const upload= multer({
    storage:storage
})
router.use('/picture',express.static('upload'));
router.post('/teamP',upload.single('profile'),async(req,res,next)=>{
    try{
    console.log(req.body);
    console.log(req.file);
    const v = new Validator(req.body,{
        team_id:'required',
        player_name:'required',
        role:'required',
        
    })
    const matched= await v.check();
    let team_id_message = v.errors.team_id?v.errors.team_id.message:"";
    let player_name_message = v.errors.player_name?v.errors.player_name.message:','+"";
    let role_message = v.errors.role?v.errors.role.message:','+"";
    // let run_message = v.errors.run?v.errors.run.message:','+"";
    // let balls_message = v.errors.balls?v.errors.balls.message:','+"";
    // let four_message = v.errors.four?v.errors.four.message:','+"";
    // let six_message = v.errors.six?v.errors.six.message:','+"";
    if(!matched){
        res.status(422).json({statusCode:422,message:team_id_message+player_name_message+role_message})
    }
    else{

            let players = await playerModel.find({'team_id':req.body.team_id})
    //   let len = players.length;
    //   console.log(len);
      if(players.length >= 11){
          res.status(400).json({statusCode:400,message:"team size completed"})
          return;
      }
      
        playerModel.create({
            team_id:req.body.team_id,
            player_name:req.body.player_name,
            role:req.body.role,
            profile:req.file.filename
        }).then(user=>{res.status(200).json({statusCode:200,message:"player added",user})})
        .catch(error=>{res.status(500).json({statusCode:500,message:"internal server error",error})})
      }
    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})
router.post('/getTeams',async(req,res,next)=>{
    try{
        const v= new Validator(req.body,{
            team_id:'required'
        })
        const matched = await v.check();
        let team_id_message = v.errors.team_id?v.errors.team_id.message:"";
        if(!matched){
            res.status(422).json({statusCode:422,message:team_id_message});
        }
        else{
     
            let players = await playerModel.find({'team_id':req.body.team_id},{player_name:1,role:1,profile:1})
            console.log(players);
            if(players.length>0){
                res.status(200).json({statusCode:200,message:"list of team members",players});
            }
           else{
               res.status(400).json({statusCode:400,message:"team not exist"});
           }

        }
    }
  catch(e){
      console.log(e);
      res.send(e);
  }
})
router.post('/score',async(req,res,next)=>{
    try{
        const v = new Validator(req.body,{
            match_Id:'required' ,
            player1_Id :'required',
            player2_Id:'required',
            bowler_Id:'required',
            over:'required|integer',
            run:'required|integer',
            player1_run:'required|integer',
            player2_run:'required|integer', 
        })
        const matched = await v.check();
        let match_Id_message= v.errors.match_Id?v.errors.match_Id.message:"";
        let player1_Id_message=v.errors.player1_Id?v.errors.player1_Id.message:','+"";
        let player2_Id_message=v.errors.player2_Id?v.errors.player2_Id.message:','+"";
        let over_message=v.errors.over?v.errors.over.message:','+"";
        let run_message=v.errors.run?v.errors.over.run.message:','+"";  
        let player1_run_message=v.errors.player1_run?v.errors.player1_run.message:','+"";
        let player2_run_message=v.errors.player2_run?v.errors.player2_run.message:','+"";
        if(!matched){
        res.status(422).json({statusCode:200,message:match_Id_message+player1_Id_message+player2_Id_message+over_message
            +run_message+player1_run_message+player2_run_message})
        }
        else{
        
            let result = await scoremodel.create({
                match_Id: req.body.match_Id,
                player1_Id :req.body.player1_Id,
                player2_Id:req.body.player2_Id,
                bowler_Id:req.body.bowler_Id,
                over:req.body.over,
                run:req.body.run,
                player1_run:req.body.player1_run,
                player2_run:req.body.player2_run,
                 })
                 if(result){
                     console.log(result);
                    res.status(200).json({statusCode:200,message:"current status",result})
                    return;
                 }
              res.status(400).json({statusCode:400,message:"something went wrong",error})

        }
    
    }
   catch(e){
       console.log(e);
       res.send(e);
   }
})
router.post('/matchCreate',async(req,res,next)=>{
 console.log(req.body);
 try{
 const v = new Validator(req.body,{
     match_location:'required',
     match_name:'required',
     team1_id:'required',
     team2_id:'required',
     match_date:'required'
 })
 const matched = await v.check();
 let match_location_message= v.errors.match_location?v.errors.match_location.message:"";
 let match_name_message= v.errors.match_name?v.errors.match_name.message:','+"";
 let team1_id_message= v.errors.team1_id?v.errors.team1_id.message:','+"";
 let team2_id_message= v.errors.team2_id?v.errors.team2_id.message:','+"";
 let match_date_message= v.errors.match_date?v.errors.match_date.message:','+"";
 if(!matched){
res.status(422).json({statusCode:422,message:match_location_message+match_name_message+team1_id_message+team2_id_message+match_date_message})
 }
 else{

  let result = await matchModel.create({
        match_location:req.body.match_location,
        match_name:req.body.match_name,
        team1_id:req.body.team1_id,
        team2_id:req.body.team2_id,
         match_date:req.body.match_date,
     })
if(result){
    console.log(result);
    res.status(200).json({statusCode:200,message:"match created",result})
    return;
}
res.status(400).json({statusCode:400,message:"something went wrong"})
 }
}
catch(e){
    console.log(e);
    res.send(e);
}

})
router.post('/playerscore',async(req,res,next)=>{
    console.log(req.body); 
    let result = await playerscoreModel.create({
        batsman:req.body.batsman
    })
    console.log(result.batsman);
  for(player of result.batsman){
      console.log(player.player_id);
//    let final= await  playerModel.findOne({'_id':player.player_id})
//    console.log(final);
   playerModel.findByIdAndUpdate({'_id':player.player_id},{$set:{
       run:player.run,
       balls:player.balls,
       four:player.four,
       six:player.six,
       is_played:1
   }},(err,final)=>{
    if(final){
        console.log("updated");
    }
   })
  }
  res.send("updated")
})
router.get('/getscore',async(req,res,next)=>{
    let result= await playerModel.find();
    console.log(result);
    res.send(result);
})

module.exports= router;