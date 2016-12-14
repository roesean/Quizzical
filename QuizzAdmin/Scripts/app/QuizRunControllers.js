 //var  modules = modules || [];
(function () {
    'use strict';
    //modules.push('QuizRun');

    angular.module('myApp')
    .controller('QuizRun_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/QuizRun/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('QuizRun_details', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

        $http.get('/Api/QuizRun/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('QuizRun_create', ['$scope', '$http', '$stateParams', '$location', function($scope, $http,$stateParams, $location){

        $scope.data = {};
                $http.get('/Api/User/')
        .then(function(response){$scope.UserId_options = response.data;});
        
        $scope.save = function(){
            $http.post('/Api/QuizRun/', $scope.data)
            .then(function(response){ $location.path("QuizRun"); });
        }

    }])
    .controller('QuizRun_edit', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/QuizRun/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

                $http.get('/Api/User/')
        .then(function(response){$scope.UserId_options = response.data;});
        
        $scope.save = function(){
            $http.put('/Api/QuizRun/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("QuizRun"); });
        }

    }])
    .controller('QuizRun_delete', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/QuizRun/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/QuizRun/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("QuizRun"); });
        }

    }])

    .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
            .state('quizRunList', {
                url: 'quizrun',
                templateUrl: '/Static/QuizRun_List',
                controller: 'QuizRun_list'
            })
            .state('quizRunCreate', {
                url: 'quizrun/create',
                templateUrl: '/Static/QuizRun_Edit',
                controller: 'QuizRun_create'
            })
            .state('quizRunEdit', {
                url: 'quizrun/edit/:id',
                templateUrl: '/Static/QuizRun_Edit',
                controller: 'QuizRun_edit'
            })
            .state('quizRunDelete', {
                url: 'quizrun/delete/:id',
                templateUrl: '/Static/QuizRun_Delete',
                controller: 'QuizRun_delete'
            })
            .state('quizRunDetails', {
                url: 'quizrun/details/:id',
                templateUrl: '/Static/QuizRun_Details',
                controller: 'QuizRun_details'
            })
    }])
;

})();
