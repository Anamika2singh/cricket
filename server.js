const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyparser.json({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));
const matchroute = require('./route/match');
let PORT = process.env.PORT || 3000

mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://annu:anamika@cluster0.fhigx.mongodb.net/cricket?retryWrites=true&w=majority',{useNewUrlParser:true ,useUnifiedTopology: true})
.then(()=>console.log('connection successful'))
.catch((err)=>console.error(err))
app.use('/',matchroute);
app.listen(PORT);