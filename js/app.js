var jiffleApp = angular.module("jiffleApp", ['ngRoute']);
jiffleApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl : 'partials/start.html',
        controller  : 'jiffleController'
    }).when('/game', {
        templateUrl: 'partials/game.html',
        controller  : 'jiffleController'
    }).when('/result', {
        templateUrl: 'partials/final.html',
        controller  : 'jiffleController'
    });
    $locationProvider.html5Mode(true);
});
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
jiffleApp.controller('jiffleController', function($scope, $http, quizService, $location, $rootScope) {
    
    $scope.allAnswer = [];
    $scope.next = function(){
      $scope.currentQuestionIndex++;
      $scope.currentQuestion = $scope.quizResponse[$scope.currentQuestionIndex];
    }
    $scope.Previous = function(){
      $scope.currentQuestionIndex--;
      $scope.currentQuestion = $scope.quizResponse[$scope.currentQuestionIndex];
    }
    $scope.submitAnswer = function(question, selectedAnswer){
      if(selectedAnswer == void 0){
        $scope.allAnswer[$scope.currentQuestionIndex] = {
          "correctAnswer" : question.answer + 1,
          "yourAnswer": ""
        };
      }else{
        $scope.allAnswer[$scope.currentQuestionIndex] = {
          "correctAnswer" : question.answer + 1,
          "yourAnswer": selectedAnswer
        };
      }
      
    }
    $scope.finalSubmit = function(){
      $rootScope.score = 0;
      angular.forEach($scope.allAnswer,function(data){
          switch(data.correctAnswer){
            case 1 :  if(data.yourAnswer === "A")
                        $rootScope.score++;
                      break;
            case 2 :  if(data.yourAnswer === "B")
                        $rootScope.score++;
                      break;
            case 3 :  if(data.yourAnswer === "C")
                        $rootScope.score++;
                      break;
            case 4 :  if(data.yourAnswer === "D")
                        $rootScope.score++;
                      break;
          }
      })
      $location.path('/result');
    }
    quizService.fetchServiceData(function(response){
        $scope.quizResponse = response.data;
        $scope.currentQuestionIndex = 0;
        $scope.currentQuestion = $scope.quizResponse[$scope.currentQuestionIndex];
    });
    $scope.startGame = function(){
      $location.path('/game');
    }
    $scope.startAgain = function(){
      $location.path('/');
    }
});

