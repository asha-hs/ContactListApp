
var contactApp = angular.module('cApp',[]);
contactApp.controller('appCtrl',['$scope','$http',function($scope,$http){
  console.log("hello from angular controller");

var refresh = function(){
  $http.get('/contactlist').then(function(response){
    console.log("I got the data I requested");
    console.log(response);
    $scope.contactlist = response.data;
  },function(response){

  });
};
refresh();
$scope.deselect = function(){
  $scope.contact.name = ' ';
  $scope.contact.email = ' ';
  $scope.contact.number = ' ';
}
  $scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactlist',$scope.contact).then(function(response){
      console.log(response);
      refresh();
      $scope.deselect();
    },function(res){});


  };
  $scope.removeContact = function(id){
    console.log(id);
    $http.delete('/contactlist/'+id).then(function(res){
      refresh();
    });
  };
  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/'+id).then(function(res){
      $scope.contact = res.data;
    });
  };

  $scope.update = function(){
    $http.put('/contactlist/' +$scope.contact._id,$scope.contact).then(function(res){
      refresh();
    });
  };



}])
