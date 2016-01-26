/// <reference path="../typings/tsd.d.ts" />

import mongoose = require('mongoose');
import bodyParser = require('body-parser');
let validator = require('mongoose-unique-validator')
let nodemailer = require('nodemailer');

mongoose.connect('mongodb://ghayyas94:12345@ds047865.mongolab.com:47865/quizapp');

let db = mongoose.connection;

db.on('connect', ()=>{console.log('connected')});

let userSchema = new mongoose.Schema({
    userName : {type: String, required: true, index: true, unique: true },
    userEmail: {type: String, required: true, index: true, unique: true },
    userPass: {type: String, required: true},
    Date: {type: String , default: Date.now()}
});



let questionSchema = new mongoose.Schema({
    question: {type:String, unique: true},
    op1: String,
    op2: String,
    op3: String,
    op4: String,
    rightAnswer: String,
    questionType: String,
    quizTopic: String,
    CreatedAt: {type: String, default: Date.now()}
});

let resultSchema = new mongoose.Schema({
    userID: String,
    userName: String,
    userEmail: String,
    quizTopic: String,
    userResult: String,
    date: {type: String, default: Date.now()}
    
})
userSchema.plugin(validator);

let User = mongoose.model('Users', userSchema);

let Question = mongoose.model('Questions',questionSchema);

let Result = mongoose.model('Results', resultSchema);

exports.registerUser = (req,res)=>{
    let userName = req.body.userName;
    let userEmail = req.body.userEmail;
    let userPass = req.body.userPass


let userInfo = new User({
    
    userName: userName,

    userEmail: userEmail,
    userPass: userPass
});



userInfo.save((err,data)=>{
    
    if(err){
        res.json({success: false,'message': "Cant register to this user Name"  ,err});
        console.log('got Err :' +err);
    }
    
    else{
        console.log('Data Recieved' , data);
        res.json({success:true, "message": "Registered" , 'data is': data});
    }
    console.log("data Saved");
});
}



exports.loginUser = (req,res)=>{
    let userName = req.body.userName;
    //let userEmail = req.body.userEmail;
    let userPass = req.body.userPass;
    
    
    User.findOne({userName:userName,userPass: userPass},(err,data)=>{
           if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred' +err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.json({success: false ,"message" : "user Not Found" });

            }else{
                console.log("user ID is :" ,data._id);
                res.json({success: true, "data" : data});
                
                console.log("data posted "+data);
                
            }//else  for data forward

        }//Main else

    })//FindOne funtionx

    
}


exports.addQuestion = (req,res)=>{
    let data = req.body;
    
    let question_info = new Question({
        question :data.ques,
        op1: data.op1,
        op2: data.op2,
        op3: data.op3,
        op4: data.op4,
        rightAnswer: data.rightAnswer,
       questionType: data.questionType,
        quizTopic: data.quizName
    })
    Question.findOne({question:req.body.ques},(err, data)=>{
        
        if(!data){
            console.log("data Doesnt exists..");
            res.json({success: true, "msg":"Data Saved.."})
            question_info.save((err,success)=>{
        if(err){
            console.log('Error got '+err)
            res.json({success: false , data : err});
        }
        else {
            console.log("Request got " +success);
            res.json({success:true, data: success});
        }
        
    })        
        }
        else{
            console.log('Data Already exists');
            res.json({success: false, "msg": "This Question Already Exists.."});
        }
        
    })
    
}

exports.getquizes = (req,res) => {
   //let quizName = req.body.paper;
   console.log('getquizes')
   console.log(req.body.paper)
   //quizName = quizName.toLowerCase();
//    console.log("Selected paper :",req.body.q_id1);
   
   Question.find({quizTopic:req.body.paper},(err,data)=>{
       console.log('find: ' + req.body.paper);
       console.log(err);
       console.log(data);
       if(err){
           console.log('got Error ' +err);
           res.json({result: false, data: null});
       }
       else{
           console.log('Got Data ' ,data);
            res.json({result: true, data: data});
       }
       
   })

    // console.log("Data come :",req.body);
    
    
    
    
}

exports.saveResult = (req,res)=>{
    
   let user_result = req.body.riteans_perc;
   let userID = req.body.userID;
   
   let quizTopic = req.body.quizTopic;
   let userName = req.body.userName;
   
   console.log(userID +"=="+ user_result);
   
   let myDate = new Date();
   
   let result_info = new Result({
       userID: userID,
       quizTopic: quizTopic,
       userName: userName,
       userResult: user_result,
       date: myDate
   })
   
   result_info.save((err,data)=>{
       if(err){
           console.log("Saving Result Failed.." +err)
           res.json({success:false , data: err})
       }
       else{
           console.log("Result is Saved.." ,data ,"quizName");
           
           res.json({success: true, data: data})
           
       }
       
       console.log("Result Recived." ,data);
       //res.send("Result Recived.")
   })
}



exports.showResult = (req,res)=>{
    
    let userID = req.body.userID;
    
    Result.find({userID:userID},(err,data)=>{
        if(err){
            console.log("Got Error on Find Results");
            res.json({success: false, data: err});
        }
        else{
            if(!data){
                console.log("record Not found");
                res.json({success: false, data: "Record not Found"});
                
            }
            else{
                res.json({success: true, data: data})
            }
        }
    })
    
}
exports.userProfile = (req,res)=>{
    //let UserID = req.body.UserID;
    let UserID = req.params.uid;
    console.log(UserID);
    
  User.findById(UserID,(err,data)=>{
      if(err){
          console.log("got error from User Profile" ,err)
          res.json({success: false, "Error": err})
      }
      else{
          console.log("got Data from user Profile ", data)
          res.json({success: true, "Data": data})
      }
  })
    
}
exports.findAllUsers  = (req,res)=>{
    User.find((err,data)=>{
        if(err){
            console.log("Users not Find.." +err);
            res.json({success: false, "data": err})
        }
        else{
            console.log("Users Finds.. " +data)
            res.json({success:true, "data": data})
        }
    })
    
}

exports.emailSend = (req,res)=>{
    var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "engabcd123@gmail.com",
        pass: "codevirtual"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
   // from: req.body.from, // sender address
    to: "ghayyasmubashir@gmail.com", // list of receivers
    subject: req.body.from, // Subject line
    text: req.body.senderName, // plaintext body
    html: req.body.htmlCode // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        res.json({success:false ,"msg": "Some thing went wrong",error});
    }else{
        console.log("Message sent: " + response.message);
        res.json({success: true,"msg" : "Message Sent" , response});
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
}


exports.findAllResults = (req,res)=>{
    let userID = req.body.userID;
    console.log(req.body)
    Result.find({userID:userID},(err,data)=>{
    if(err){
        console.log("got err" ,err);
        res.json({success: false ,data: err});
    }    
    else{
        console.log("got data admin " ,data);
    }    res.json({success: true, data: data})
    })
    
}

/*
exports.deleteQuestion = (req,res)=>{
    let QuestionID = req.params.uid;
    console.log(QuestionID);
    
    Question.findByIdAndRemove(QuestionID,(err,data)=>{
        if(err){
            console.log("got error from QuestionID" ,err);
        }
        else{
            console.log("got Success from QuestionID" , data);
        }
    })
    
}
*/