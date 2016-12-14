 //var  modules = modules || [];
(function () {
    'use strict';
    //modules.push('Answer');

    angular.module('myApp')
    .controller('Answer_list', ['$scope', '$http', function ($scope, $http) {

        $http.get('/Api/Answer/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Answer_details', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

        $http.get('/Api/Answer/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('Answer_create', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $scope.data = {};
                $http.get('/Api/Question/')
        .then(function(response){$scope.QuestionId_options = response.data;});
        
        $scope.save = function(){
            $http.post('/Api/Answer/', $scope.data)
            .then(function(response){ $location.path("Answer"); });
        }

    }])
    .controller('Answer_edit', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/Answer/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

                $http.get('/Api/Question/')
        .then(function(response){$scope.QuestionId_options = response.data;});
        
        $scope.save = function(){
            $http.put('/Api/Answer/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("Answer"); });
        }

    }])
    .controller('Answer_delete', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/Answer/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/Answer/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("Answer"); });
        }

    }])

    .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
            .state('answerList', {
                url: '/Answer',
                templateUrl: '/Static/Answer_List',
                controller: 'Answer_list'
            })
            .state('answerCreate', {
                url: '/Answer/Create',
                templateUrl: '/Static/Answer_Edit',
                controller: 'Answer_create'
            })
            .state('answerEdit', {
                url: '/Answer/Edit/:id',
                templateUrl: '/Static/Answer_Edit',
                controller: 'Answer_edit'
            })
            .state('answerDelete', {
                url: '/Answer/Delete/:id',
                templateUrl: '/Static/Answer_Delete',
                controller: 'Answer_delete'
            })
            .state('answerDetails', {
                url: '/Answer/:id',
                templateUrl: '/Static/Answer_Details',
                controller: 'Answer_details'
            })
    }])
;

})();
