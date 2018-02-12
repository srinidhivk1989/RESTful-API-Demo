const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

//set up express app
const app=express();

//Connect to mongodb
mongoose.connection.openUri('mongodb://localhost/ninjago');﻿
console.log('hi');
mongoose.Promise=global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
  //console.log(err);
  res.send({error: err._message});
});

//listen for requests
app.listen(process.env.PORT || 4000,function(){
console.log('now listening for requests');
});
