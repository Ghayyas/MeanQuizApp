/// <reference path="./typings/tsd.d.ts" />
var express = require("express");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var nodemailer = require('nodemailer');
var port = process.env.PORT || 8080;
var database = require('./dataBase');
var app = express();
var router = express.Router();
//middleware functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
//router.get('/',database.index)
var Ipublic = path.resolve(__dirname, 'public');
app.use(express.static(Ipublic));

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.post('/registerUser', database.registerUser);
app.post('/loginUser', database.loginUser);
app.post('/addQuestion', database.addQuestion);
// app.post('/getquizes',function(req,res){
//     console.log('ksjskjskjskljsklsj');
//     res.send("hahaha");
// });
app.post('/getquizes', database.getquizes);
app.post("/saveResult", database.saveResult);
app.post('/showResult', database.showResult);
app.post('/userProfile/:uid', database.userProfile);
app.post('/findAllUsers', database.findAllUsers);
app.post('/findAllResults', database.findAllResults);
app.post('/emailSend', database.emailSend);
//app.post('/deleteQuestion/:uid',database.deleteQuestion);
// app.post('/userProfile/:uid',function(req, res){
//     console.log(req.body);
//     console.log(req.params);
//     res.send('sdsdsdds')
// });
app.use(function (req, res) {
    res.sendFile(Ipublic + "/index.html");
});
app.listen(port, function () {
    console.log('Server is starting to port ' + port);
});
