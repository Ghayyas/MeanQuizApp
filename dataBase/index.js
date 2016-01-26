/// <reference path="../typings/tsd.d.ts" />
var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');
var nodemailer = require('nodemailer');
mongoose.connect('mongodb://ghayyas94:12345@ds047865.mongolab.com:47865/quizapp');
var db = mongoose.connection;
db.on('connect', function () { console.log('connected'); });
var userSchema = new mongoose.Schema({
    userName: { type: String, required: true, index: true, unique: true },
    userEmail: { type: String, required: true, index: true, unique: true },
    userPass: { type: String, required: true },
    Date: { type: String, default: Date.now() }
});
var questionSchema = new mongoose.Schema({
    question: { type: String, unique: true },
    op1: String,
    op2: String,
    op3: String,
    op4: String,
    rightAnswer: String,
    questionType: String,
    quizTopic: String,
    CreatedAt: { type: String, default: Date.now() }
});
var resultSchema = new mongoose.Schema({
    userID: String,
    userName: String,
    userEmail: String,
    quizTopic: String,
    userResult: String,
    date: { type: String, default: Date.now() }
});
userSchema.plugin(validator);
var User = mongoose.model('Users', userSchema);
var Question = mongoose.model('Questions', questionSchema);
var Result = mongoose.model('Results', resultSchema);
exports.registerUser = function (req, res) {
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPass = req.body.userPass;
    var userInfo = new User({
        userName: userName,
        userEmail: userEmail,
        userPass: userPass
    });
    userInfo.save(function (err, data) {
        if (err) {
            res.json({ success: false, 'message': "Cant register to this user Name", err: err });
            console.log('got Err :' + err);
        }
        else {
            console.log('Data Recieved', data);
            res.json({ success: true, "message": "Registered", 'data is': data });
        }
        console.log("data Saved");
    });
};
exports.loginUser = function (req, res) {
    var userName = req.body.userName;
    //let userEmail = req.body.userEmail;
    var userPass = req.body.userPass;
    User.findOne({ userName: userName, userPass: userPass }, function (err, data) {
        if (err) {
            console.log('An error has occurred');
            res.send('An error has occurred' + err);
        }
        else {
            if (!data) {
                console.log('record not found');
                res.json({ success: false, "message": "user Not Found" });
            }
            else {
                console.log("user ID is :", data._id);
                res.json({ success: true, "data": data });
                console.log("data posted " + data);
            } //else  for data forward
        } //Main else
    }); //FindOne funtionx
};
exports.addQuestion = function (req, res) {
    var data = req.body;
    var question_info = new Question({
        question: data.ques,
        op1: data.op1,
        op2: data.op2,
        op3: data.op3,
        op4: data.op4,
        rightAnswer: data.rightAnswer,
        questionType: data.questionType,
        quizTopic: data.quizName
    });
    Question.findOne({ question: req.body.ques }, function (err, data) {
        if (!data) {
            console.log("data Doesnt exists..");
            res.json({ success: true, "msg": "Data Saved.." });
            question_info.save(function (err, success) {
                if (err) {
                    console.log('Error got ' + err);
                    res.json({ success: false, data: err });
                }
                else {
                    console.log("Request got " + success);
                    res.json({ success: true, data: success });
                }
            });
        }
        else {
            console.log('Data Already exists');
            res.json({ success: false, "msg": "This Question Already Exists.." });
        }
    });
};
exports.getquizes = function (req, res) {
    //let quizName = req.body.paper;
    console.log('getquizes');
    console.log(req.body.paper);
    //quizName = quizName.toLowerCase();
    //    console.log("Selected paper :",req.body.q_id1);
    Question.find({ quizTopic: req.body.paper }, function (err, data) {
        console.log('find: ' + req.body.paper);
        console.log(err);
        console.log(data);
        if (err) {
            console.log('got Error ' + err);
            res.json({ result: false, data: null });
        }
        else {
            console.log('Got Data ', data);
            res.json({ result: true, data: data });
        }
    });
    // console.log("Data come :",req.body);
};
exports.saveResult = function (req, res) {
    var user_result = req.body.riteans_perc;
    var userID = req.body.userID;
    var quizTopic = req.body.quizTopic;
    var userName = req.body.userName;
    console.log(userID + "==" + user_result);
    var myDate = new Date();
    var result_info = new Result({
        userID: userID,
        quizTopic: quizTopic,
        userName: userName,
        userResult: user_result,
        date: myDate
    });
    result_info.save(function (err, data) {
        if (err) {
            console.log("Saving Result Failed.." + err);
            res.json({ success: false, data: err });
        }
        else {
            console.log("Result is Saved..", data, "quizName");
            res.json({ success: true, data: data });
        }
        console.log("Result Recived.", data);
        //res.send("Result Recived.")
    });
};
exports.showResult = function (req, res) {
    var userID = req.body.userID;
    Result.find({ userID: userID }, function (err, data) {
        if (err) {
            console.log("Got Error on Find Results");
            res.json({ success: false, data: err });
        }
        else {
            if (!data) {
                console.log("record Not found");
                res.json({ success: false, data: "Record not Found" });
            }
            else {
                res.json({ success: true, data: data });
            }
        }
    });
};
exports.userProfile = function (req, res) {
    //let UserID = req.body.UserID;
    var UserID = req.params.uid;
    console.log(UserID);
    User.findById(UserID, function (err, data) {
        if (err) {
            console.log("got error from User Profile", err);
            res.json({ success: false, "Error": err });
        }
        else {
            console.log("got Data from user Profile ", data);
            res.json({ success: true, "Data": data });
        }
    });
};
exports.findAllUsers = function (req, res) {
    User.find(function (err, data) {
        if (err) {
            console.log("Users not Find.." + err);
            res.json({ success: false, "data": err });
        }
        else {
            console.log("Users Finds.. " + data);
            res.json({ success: true, "data": data });
        }
    });
};
exports.emailSend = function (req, res) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "engabcd123@gmail.com",
            pass: "codevirtual"
        }
    });
    // setup e-mail data with unicode symbols
    var mailOptions = {
        // from: req.body.from, // sender address
        to: "ghayyasmubashir@gmail.com",
        subject: req.body.from,
        text: req.body.senderName,
        html: req.body.htmlCode // html body
    };
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.json({ success: false, "msg": "Some thing went wrong", error: error });
        }
        else {
            console.log("Message sent: " + response.message);
            res.json({ success: true, "msg": "Message Sent", response: response });
        }
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
};
exports.findAllResults = function (req, res) {
    var userID = req.body.userID;
    console.log(req.body);
    Result.find({ userID: userID }, function (err, data) {
        if (err) {
            console.log("got err", err);
            res.json({ success: false, data: err });
        }
        else {
            console.log("got data admin ", data);
        }
        res.json({ success: true, data: data });
    });
};
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
