angular.module('app.getQuestion',[])
.controller('getQuizCtrl',function($scope,$rootScope,$http, $document, $location, $state,heroku){
    //$scope.quizName = {q_id1: $scope.selectedPaper};
    
         $scope.isLogin = false;
           
        var id = sessionStorage.id;
        var userName = sessionStorage.userName;
        $document.ready(function(){
          if(id == null){
         $scope.isLogin = false;
         $state.go('home');
     }
     else{
         $scope.isLogin = true;
     }
     
    })
    $scope.select = {};
    
    $rootScope.signOut = function(){
         $rootScope.isLogin = false;
         localStorage.clear();
         sessionStorage.clear();
         $state.go('home');
     }
     
    $scope.questionArray = [];
    $scope._quiz_start = true;
    //$scope.obj = {};
      $scope.QuestionNo= 0;
      var riteans_perc;
        //$scope.noQuiz = false;    
    $scope.startQuiz = function(){
            $scope.result = false;
            $scope._quiz_start = false;
            $scope.lastResult = false;
        $scope.quiz_box = true;
        $scope.info_box = false;

        
        //console.log("Selected Papervv:",$scope.selectedPaper);
        
        $http.post(heroku +'/getquizes',{paper:$scope.select.selectedPaper}).then(function(data)
        {
            
             $scope.questionArray = data.data.data;
             console.log('queis array' ,data.data.data);
             if($scope.questionArray == ""){
                 $scope.noQuiz = true;
                 $scope.quiz_box = false;
             }
             var id = data.data._id;
             console.log('get Quiz ID : ', id);
             
             console.log("Papers : ",$scope.questionArray);
            $scope.quiz = $scope.questionArray[$scope.QuestionNo];
            console.log("$scope.quiz" ,$scope.quiz.question);
     
        },function(err)
        {
            console.log("Request not send on server" , err);
        })
    }
    
    $scope.selectedOption = {};

    $scope.correct = 0;
    $scope.percentage = 0;
    $scope.result = false;
    
    
    $scope.nextQuestion = function() {
        console.log("Right Answer ", $scope.quiz.rightAnswer);

      if(($scope.selectedOption.option.toString())=== $scope.quiz.rightAnswer){
             $scope.correct++;

      }

      else{
          $scope.correct;
      }
      
       $scope.QuestionNo++;
       $scope.quiz = $scope.questionArray[$scope.QuestionNo];
       //console.log('seclected option Checkbox', $scope.selectedOption.option);
       //console.log('seclected option ', $scope.selectedOption.option.toString());
        
       $scope.selectedOption = "";
       if(($scope.QuestionNo) == $scope.questionArray.length){
                   $scope.quiz_box = false;
                   $scope.result = true;
                   $scope.results_result = true;
                   console.log($scope.correct);
                    riteans_perc =  $scope.correct/$scope.questionArray.length*100;
                    var per = Math.round(parseInt(riteans_perc)) + "%";
       
                  $scope.percentage =  per;
                  //var paper = $scope.selectedPaper;
                  
                 
                  $http.post(heroku + '/saveResult',{userName: userName, quizTopic:$scope.select.selectedPaper, userID: id, riteans_perc: per}).then(function(data){
                      
                      console.log('data from save result ', data.data);
                      
                  },function(err){
                      console.log('Got err from Save Result ' ,err);
                  })
                  
       
       }
       
    }
    
    $scope.lastResult = false;
    $scope.noResult = false;
       $scope.showLastResult = function(){
        $scope.result = false;
        $scope._quiz_start = false;
        $scope.results_result = false;
        
      $http.post(heroku +'/showResult',{userID:id}).then(function(data){
          console.log("Showing result ", data.data.data);
          
          if(data.data.data == null || data.data.data == ""){
              $scope.userResult = "There is no Result to shown.."
              $scope.noResult = true;
          }
          else{
              $scope.noResult = false;
          $scope.results= data.data.data;
          console.log("Results " ,$scope.results);
          $scope.lastResult = true;

          } },
      function(err){
          console.log('Got Error due to ' ,err);
      })
    
    }
})