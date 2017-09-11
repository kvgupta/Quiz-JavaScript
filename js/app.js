var jiffleApp = angular.module("jiffleApp", []);

jiffleApp.service('quizService', function($http){
    this.fetchServiceData = function(callback){
        $http.get("https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json")
        .then(function(data) {
          callback(data);
        }).catch(function(data){
          if(data.status === 404){
            alert("Not Found");
          }else if(data.status == 400){
            alert("Bad Request");
          }
        })
    };
});
jiffleApp.controller('jiffleController', function($scope, $http, quizService) {
    quizService.fetchServiceData(function(response){
      $scope.quizResponse = response.data;
      $scope.currentQuestionIndex = 0;
      $scope.currentQuestion = $scope.quizResponse[$scope.currentQuestionIndex];
    });
    $scope.next = function(){
      $scope.currentQuestionIndex++;
      $scope.currentQuestion = $scope.quizResponse[$scope.currentQuestionIndex];
    }
    $scope.Previous = function(){
      $scope.currentQuestionIndex--;
      $scope.currentQuestion = $scope.quizResponse[$scope.currentQuestionIndex];
    }
});

