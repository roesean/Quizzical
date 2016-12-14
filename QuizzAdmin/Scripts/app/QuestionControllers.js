 //var  modules = modules || [];
(function () {
    'use strict';
    //modules.push('Question');

    angular.module('myApp')
    .controller('Question_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/Question/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Question_details', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

        $http.get('/Api/Question/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Question_create', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $scope.data = {};
                $http.get('/Api/Quiz/')
        .then(function(response){$scope.QuizId_options = response.data;});
        
        $scope.save = function(){
            $http.post('/Api/Question/', $scope.data)
            .then(function(response){ $location.path("Question"); });
        }

    }])
    .controller('Question_edit', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/Question/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

                $http.get('/Api/Quiz/')
        .then(function(response){$scope.QuizId_options = response.data;});
        
        $scope.save = function(){
            $http.put('/Api/Question/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("Question"); });
        }

    }])
    .controller('Question_delete', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/Question/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Question/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("Question"); });
        }

    }])

    .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
            .state('questionList', {
                url: '/Question',
                templateUrl: '/Static/Question_List',
                controller: 'Question_list'
            })
            .state( 'questionCreate', {
                url: '/Question/Create',
                templateUrl: '/Static/Question_Edit',
                controller: 'Question_create'
            })
            .state('questionEdit', {
                url: '/Question/Edit/:id',
                templateUrl: '/Static/Question_Edit',
                controller: 'Question_edit'
            })
            .state('questionDelete', {
                url: '/Question/Delete/:id',
                templateUrl: '/Static/Question_Delete',
                controller: 'Question_delete'
            })
            .state('questionDetails', {
                url: '/Question/:id',
                templateUrl: '/Static/Question_Details',
                controller: 'Question_details'
            })
    }])
;

})();
