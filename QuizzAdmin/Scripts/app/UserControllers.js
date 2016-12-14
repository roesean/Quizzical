 //var  modules = modules || [];
(function () {
    'use strict';
    //modules.push('User');

    angular.module('myApp')
    .controller('User_list', ['$scope', '$http', function($scope, $http){

        $http.get('/Api/User/')
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('User_details', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

        $http.get('/Api/User/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

    }])
    .controller('User_create', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $scope.data = {};
        
        $scope.save = function(){
            $http.post('/Api/User/', $scope.data)
            .then(function(response){ $location.path("User"); });
        }

    }])
    .controller('User_edit', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/User/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});

        
        $scope.save = function(){
            $http.put('/Api/User/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("User"); });
        }

    }])
    .controller('User_delete', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location){

        $http.get('/Api/User/' + $stateParams.id)
        .then(function(response){$scope.data = response.data;});
        $scope.save = function(){
            $http.delete('/Api/User/' + $stateParams.id, $scope.data)
            .then(function(response){ $location.path("User"); });
        }

    }])

    .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
            .state('userList', {
                url: '/User',
                templateUrl: '/Static/User_List',
                controller: 'User_list'
            })
            .state('userCreate', {
                url: '/User/Create',
                templateUrl: '/Static/User_Edit',
                controller: 'User_create'
            })
            .state('userEdit', {
                url: '/User/Edit/:id',
                templateUrl: '/Static/User_Edit',
                controller: 'User_edit'
            })
            .state('userDelete', {
                url: '/User/Delete/:id',
                templateUrl: '/Static/User_Delete',
                controller: 'User_delete'
            })
            .state('userDetails', {
                url: '/User/:id',
                templateUrl: '/Static/User_Details',
                controller: 'User_details'
            })
    }])
;

})();
