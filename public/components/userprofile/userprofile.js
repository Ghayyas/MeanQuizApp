angular.module('app.userprofile',[])
.controller('userprofileCtrl',function($scope,$http,$rootScope,$document,$state){
  var Data;
  
        var id = sessionStorage.id;

        $document.ready(function(){
          if(id == null){
           $rootScope.isLogin = false;  
         //$state.go('home');
     }
     else{
         $rootScope.isLogin = true;
     }
     
    })
  
   //console.log('1st ' ,$rootScope.dData)

  console.log("chekck id " + id)
  $http.post('/userProfile/'+ id).then(function(data){
      Data = data.data.Data;
      $rootScope.dData = Data;
      //console.log("got Data from User Profile" , Data.userName);
       console.log('2nd ', $rootScope.dData);
  
  }, function(err){
      console.log("got Error From User PRofile.." ,err)
  })
  
  
   $scope.showMyResult = function(){
        
      $http.post('/showResult',{userID:id}).then(function(data){
          console.log("Showing result ", data.data);
          if(data.data == null || data.data == ""){
              $scope.userResult = "There is no Result to shown.."
              $scope.noResult = true;
          }
          else{
              $scope.noResult = false;
          $scope.results= data.data;
          console.log("Results " ,$scope.results);
          $scope.lastResult = true;

          } },
      function(err){
          console.log('Got Error due to ' ,err);
      })
    
    }
  

})