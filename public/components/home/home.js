angular.module('app.home',[])
.controller('quizCtrl',function($scope,$document,$rootScope,$state){
    

    //$scope.isLogin = false;
    
//     window.onbeforeunload = function(e) {
     
//      return 'Are Sure You Want to Reload this Page??';
//    };
        
    
        $document.ready(function(){
       var id = sessionStorage.id;
           if(id == null){
         $rootScope.isLogin = false;
     }

     else{
        $rootScope.isLogin = true; 

     }
  
  
  
    })        
    

   

  $scope.myDate = Date.now();
});