const express =  require('express');
var router =  express.Router();
const mongoose= require('mongoose');
const teamNmodel = require('../model/nameTeam');
const multer= require('multer');
const playerModel =  require('../model/teamP');
const scoremodel = require('../model/score');
// const jwt = require('jsonwebtoken');
// const bcrypt =  require('bcrypt');
const { Validator } = require('node-input-validator');
const { validate } = require('../model/nameTeam');
router.post('/teamN',async(req,res,next)=>{
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
        try{
            let result = await teamNmodel.create({ 
                teamName:req.body.teamName
            })
            console.log(result);
            if(result){
                res.status(200).json({statusCode:200,message:"team added",result});
            }
            else{
                res.status(400).json({statusCode:400,message:"something went wrong"});
            }
        }
           catch(e){
               console.log(e)
               res.send(e);
           }

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
        console.log(req.body);
        let result= await scoremodel.create({
            matchType :req.body.matchType ,
            strikeBname :req.body.strikeBname,
            nonstrikeB:req.body.nonstrikeB,
            bowlerN:req.body.bowlerN,
            overRun:req.body.overRun,
         }).then(user=>{res.status(200).json({statusCode:200,message:"over details",user})})
     .catch(error=>{res.status(500).json({statusCode:500,message:"internal server error",error})})    
         

    }
   catch(e){
       console.log(e);
   }
})
module.exports= router;