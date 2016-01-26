angular.module('app.signup',[])
.controller('signupCtrl',function($scope,$http,$state,$mdToast,heroku){
    $scope.user = {};
   $scope.isSignup = true;
   $scope.userName = false;
   $scope.userEmail = false;
   $scope.userPass = false;
  
   $scope.userName1 = function(){
       $scope.userName = true;
       $scope.userEmail = false;

   }
   $scope.userEmail1 = function(){
       $scope.userName = false;
       $scope.userEmail = true;

   }
   $scope.userPass1 = function(){
       $scope.userName = false;
       $scope.userEmail = false;
   }
   $scope.userPass2 = function(){
       $scope.userName = false;
       $scope.userEmail = false;
   }

    $scope.submit = function(){
        //console.log($scope.user);
        

        
        $http.post(heroku+'/registerUser', $scope.user).then(function(data){
            //console.log(data);
           
            if((($scope.user.userName == null)|| $scope.user.userEmail == null) ||$scope.user.userPass ==null) {
                
                     
          $mdToast.show(
         $mdToast.simple()
        .textContent('Please fill all fields')
        .position("bottom right")
        .hideDelay(3000)
       );
                //alert('Please fill all fields..');
                $scope.user = "";
            }
  
        else if($scope.user.userPass !== $scope.user.userPass2){
         $mdToast.show(
         $mdToast.simple()
        .textContent('Password Combination Failed..')
        .position("bottom right")
        .hideDelay(3000)
       );
                //alert('Please fill all fields..');
                $scope.user = "";
            }
            //console.log($scope.user.userPass);
            //console.log( $scope.user.userPass2);
         
            else{
            if(data.data.success == false){
                
                 $mdToast.show(
         $mdToast.simple()
        .textContent("User Name or Email Already Taken..")
        .position("bottom right")
        .hideDelay(3000)
       );
            
                //alert(data.data.err.message)
                $scope.user = "";
                //console.log(data.data.err.message);
            }
            else{
                         $mdToast.show(
         $mdToast.simple()
        //.textContent(data.data.err.message)
        .textContent("Success...")
        .position("bottom right")
        .hideDelay(3000)
       );
                
                //alert("Success.....")
              $scope.isSignup = false;
              $state.go('signin');      
            }
            }
        //console.log('data Recieved ',data.data);
        //$state.go('signin');
    },function(err){
      $scope.isSignup = true;
       console.log('got err' ,err);    
    })    
    
    
    }})