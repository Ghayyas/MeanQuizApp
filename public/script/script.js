

angular.module('quizApp',['ui.router',"checklist-model",'ngMaterial','app.home','app.contact','app.signin','app.signup','app.dash','app.about','app.getQuestion',"app.addQuestion",'app.userprofile'])


// app.controller('quizCtrl',function($scope,$http){
//     $scope.user = {};
    
//     $scope.submit = function(){
//         console.log($scope.user);
//     $http.post('/registerUser', $scope.user).success(function(data){
//         console.log('data Recieved '+data);
       
//     })    
//     }
    
//     $scope.user2  = {}
//      $scope.login = function(){
//         console.log($scope.user2);
//     $http.post('/loginUser', $scope.user2).success(function(data){
       
//         console.log('data Recieved : ' +data.message);
//         console.log("data is", JSON.stringify(data));
       
       
//     })
       
//     }
    
//     $scope.question = {}
//     $scope.saved = function(){
        
//         console.log($scope.question)
        
//         $http.post('/addQuestion',$scope.question).success(function(data){
//           console.log('Success ' +data.msg);
//           $scope.data = data.msg;
//          }).config(function($mdThemingProvider) {
  
//     }
    
    
//    // $scope.quizName = {q_id1: $scope.selectedPaper};
    
    
//     $scope.questionArray = [];
//     //$scope.obj = {};
//       $scope.QuestionNo= 0;
//     $scope.startQuiz = function(){
        
//         $scope.quiz_box = true;
//         $scope.info_box = false;    
        
//         //console.log("Selected Papervv:",$scope.selectedPaper);
        
//         $http.post('/getQuestion',{paper:$scope.selectedPaper}).then(function(data)
//         {
            
//              $scope.questionArray = data.data;
//              console.log("Papers : ",$scope.questionArray);
//             $scope.quiz = $scope.questionArray[$scope.QuestionNo];

           
       
            
            
             
//             // console.log(JSON.stringify(data.data));
//              //$scope.obj = data.data.question;
//              //console.log("Run ",$scope.obj);
//           // console.log(data.data[0].question);
            
          
//         },function(err)
//         {
//             console.log("Request not send on server");
//         })
//     }
    
//     $scope.selectedOption = {};

//     $scope.correct = 0;
//     $scope.percentage = 0;
//     $scope.result = false;
//     $scope.nextQuestion = function() {
//         console.log("Right Answer ", $scope.quiz.rightAnswer);

//       if(($scope.selectedOption.option)=== $scope.quiz.rightAnswer){
//              $scope.correct++;

//       }
//       else{
//           $scope.correct;
//       }
      
//        $scope.QuestionNo++;
//        $scope.quiz = $scope.questionArray[$scope.QuestionNo];
//        console.log('seclected option ', $scope.selectedOption.option)
        
//        $scope.selectedOption = "";
//        if(($scope.QuestionNo) ==$scope.questionArray.length){
//                    $scope.quiz_box = false;
//                    $scope.result = true;
//                    console.log($scope.correct);
//                    $scope.percentage =  $scope.correct/$scope.questionArray.length*100 + "%";
//        }
       
//     }
  
    
// })