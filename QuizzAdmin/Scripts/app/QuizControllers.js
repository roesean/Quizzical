 //var  modules = modules || [];
(function () {
    'use strict';
    //modules.push('Quiz');

    angular.module('myApp')
    .controller('Quiz_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Quiz/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Quiz_details', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

        $http.get('/Api/Quiz/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Quiz_create', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $scope.data = {};
        
        $scope.save = function(){
            $http.post('/Api/Quiz/', $scope.data)
            .then(function(response){ $location.path("Quiz"); });
        }

    }])
    .controller('Quiz_edit', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/Quiz/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

        
        $scope.save = function(){
            $http.put('/Api/Quiz/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("Quiz"); });
        }

    }])
    .controller('Quiz_delete', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/Quiz/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Quiz/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("Quiz"); });
        }

    }])

    .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
            .state('quizList', {
                url: '/Quiz',
                templateUrl: '/Static/Quiz_List',
                controller: 'Quiz_list'
            })
            .state('quizCreate', {
                url: '/Quiz/Create',
                templateUrl: '/Static/Quiz_Edit',
                controller: 'Quiz_create'
            })
            .state('quizEdit', {
                url: '/Quiz/Edit/:id',
                templateUrl: '/Static/Quiz_Edit',
                controller: 'Quiz_edit'
            })
            .state('quizDelete', {
                url: '/Quiz/Delete/:id',
                templateUrl: '/Static/Quiz_Delete',
                controller: 'Quiz_delete'
            })
            .state('quizDetails', {
                url: '/Quiz/:id',
                templateUrl: '/Static/Quiz_Details',
                controller: 'Quiz_details'
            })
    }])
;

})();
