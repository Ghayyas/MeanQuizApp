/// <reference path="./typings/tsd.d.ts" />

import express = require("express");
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
import methodOverride = require('method-override');
import path = require('path');


let nodemailer = require('nodemailer');


let port = process.env.PORT || 8080;
let database = require('./dataBase'); 
let app = express();
let router = express.Router();

//middleware functions

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(methodOverride());

//router.get('/',database.index)
   
let Ipublic = path.resolve(__dirname,'public');

app.use(express.static(Ipublic)); 


app.post('/registerUser',database.registerUser);
app.post('/loginUser',database.loginUser);
app.post('/addQuestion',database.addQuestion);
app.post('/getQuestions',database.getQuestion);
app.post("/saveResult",database.saveResult);
app.post('/showResult',database.showResult);
app.post('/userProfile/:uid',database.userProfile);
app.post('/findAllUsers',database.findAllUsers);
app.post('/findAllResults',database.findAllResults);
app.post('/emailSend',database.emailSend);
//app.post('/deleteQuestion/:uid',database.deleteQuestion);
// app.post('/userProfile/:uid',function(req, res){
//     console.log(req.body);
//     console.log(req.params);
//     res.send('sdsdsdds')
// });






 app.use(function(req, res){
       res.sendFile(Ipublic+"/index.html");
   });

app.listen(port,()=>{
    console.log('Server is starting to port ' +port);
});

