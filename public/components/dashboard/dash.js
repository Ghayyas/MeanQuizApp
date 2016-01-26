var app = angular.module('app.dash',[]);
app.controller('dashCtrl',function($scope,$document,$http,$state,$rootScope,heroku){
var that = this;

      var id = sessionStorage.id;
      that.isAdmin = false;
       //var userName = sessionStorage.userName;
        $document.ready(function(){
     
            if(id !== '56a736e5ecc25fc92b468045'){
           
             $state.go('home');       
            }
            if(id == '56a736e5ecc25fc92b468045'){
                that.isAdmin = true;
            }
         //$scope.users = 0;
           that.users = true;
           that.userResults = false;
          $http.post(heroku+'/findAllUsers').then(function(data){
           console.log("Getting response form Users" ,data);
           that.users = data.data.data;
           //console.log(that.users);
           that.userID = data.data.data;
           
         that.back2users = function(){
           that.errShow = false;  
           that.users = true;
           that.userResults = false;
           $http.post(heroku +'/findAllUsers').then(function(data){
           console.log("Getting response form Users" ,data);
           that.users = data.data.data;
           });
              
          }
           
          // var xId = that.userID;
        //    for(var prop in that.userID){
        //     //    var xId = that.userID[i]._id;
        //     //     console.log("The length is" ,xId);
        //     var xId = that.userID[prop]._id;
        //       console.log("obj." + prop + " = " + that.userID[prop]._id);

           
           

        //    }
          $scope.showUserResult = function(userID){
              that.users = false;
              that.userResults = true;
                console.log('userID', userID);
               $http.post(heroku+'/findAllResults',{userID: userID}).then(function(data){
                   console.log("user results " ,data.data.data);
                   
                   if(data.data.data == ""){
                          that.users = false;
                          that.userResults = false;
                          that.errShow = true;
                          that.showError = "There is no Result to Show";
                   }
                   else{
                      that.userResult = data.data.data;    
                          that.users = false;
                          that.userResults = true;
                          that.errShow = false;
                   
                   }
               }, function(err){
                   console.log("getting error " ,err);
               }) 
          
          }
          

           
        //    for(var i = 0; i < .length; i++){
        //        data.data.data[i];
        //     console.log(that.users.userEmail);
        //    }
        //    $scope.myData = data.data.data[$scope.users];
        //    $scope.users++;
        //    console.log($scope.myData.userName);
        //    console.log(data.data.data.length);

       }, function(err){
           console.log("Getting Error",err)
       })
     
     
     })
     
          
           
     
});