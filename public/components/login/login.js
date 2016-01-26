    var app = angular.module('app.signin',[])
    app.controller('loginCtrl',function($scope,$mdToast,$http,$location,$document,$state, $rootScope,heroku){
    
    
         $scope.user2  = {}

      //var userName = sessionStorage.userName;
      
      $document.ready(function(){
         $rootScope.isLogin = false;       
         //$scope.isSignup = true;
         $scope.isAdmin = false;
         $scope.loading = false;

  
      var id = sessionStorage.id;
      
      if(id == null){
         $rootScope.isLogin = false;
        // $scope.isSignup = true;
         $state.go('signin');
         
     }
     else{
        $rootScope.isLogin = true;
                 // $scope.isSignup = false;
         $state.go('getquestion');
     }
  
  
  
    })
 
     $scope.login = function(){
         if(($scope.user2.userName == null) || $scope.user2.userPass == null){
          
          
          $mdToast.show(
         $mdToast.simple()
        .textContent('Please Fill all field...')
        .position("bottom right")
        .hideDelay(3000)
        
       );
       
        $rootScope.isLogin = false;

       //alert('Please Fill all field...');
          
          $scope.user2 = "";
         
          
          }
        

       else{
           
        $http.post('/loginUser', $scope.user2).then(function(data){
       
        //console.log('data Recieved : ' +data.message);
        console.log("got Data", data);
        
        if(data.data.success == false){
              
          $mdToast.show(
         $mdToast.simple()
        .textContent('User Name or Password not found...')
        .position("bottom right")
        .hideDelay(3000)
       );
            //alert("userName or Password not found...");
            $scope.user2 = "";
             $rootScope.isLogin = false;
        }
        else{
          var jsonstr = JSON.stringify(data.data.data._id);
          console.log("JSON String is " ,jsonstr); 
          var data1 = data.data;
         var  userID = data1.data._id;

          //userName = data1.data.userName;
         //console.log("Username == " ,userName);
        
        localStorage.setItem("id",userID);
        //sessionStorage.setItem('userName',userName);
      
        
        //console.log('User id is ', userID);
        
       // console.log("data is", JSON.stringify(data));
       
       if(userID == "569f6c3b203e55c414c9800b"){
           $scope.isAdmin = true;
             
        sessionStorage.setItem("id", userID);    
           $mdToast.show(
         $mdToast.simple()
        .textContent('Wellcome Admin..')
        .position("bottom right")
        .hideDelay(3000)
       );
         
           //$scope.isSignup = false;
           $rootScope.isLogin = true;
        $state.go('dashboard');   
       }
        else{
            
        sessionStorage.setItem("id", userID);    
        
         $location.path('/');
         $scope.isAdmin = false;
           
       
         
       //  $scope.isSignup = false;
         $rootScope.isLogin = true;
        }
        }
       
    },function(err){
        
       // alert("UserName or password not Found..");
        $scope.user2 = "";
        console.log("got err" ,err)
    })
       
    }   
     }
     
     $rootScope.signOut = function(){
         $rootScope.isLogin = false;
         localStorage.clear();
         sessionStorage.clear();
         $state.go('home');
     }
     
})
 