app.controller("signUpController", function ($scope, $http, $stateParams, $state) {

    $scope.newUser = {};
    $scope.newUser.AvgScore = 0;
    $scope.newUser.TotalQuizzes = 0;
     
    $scope.signIn = function () {
        $http.get('/Api/User?username=' + $scope.username + '&password=' + $scope.password)
            .error(function () {
                $scope.error = 'Username and or Password are Invalid Try Again';
          })

            .then(function (response) {
              $state.go('HomeView');
          });
    }

    $scope.signUp = function () {
        
        $http.post('/Api/User/', $scope.newUser)
            .error(function () {
                $scope.badUser = 'Username already Exists Try Again'; 
            })

            .then(function (response) {
                $state.go('HomeView');

            });
    }

    $scope.continueAsGuest = function () {
            $state.go('HomeView');
    }
        });