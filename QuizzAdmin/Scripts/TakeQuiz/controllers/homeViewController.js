app.controller("homeViewController", function ($scope, $http, $stateParams) {

  $scope.dismissModal = function () {
    $('#quizResultsModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
  $scope.dismissModal();

    $scope.quizzes = [];
    $scope.visitorName = "Neilyo";
    $scope.tempVisitorName = "";
    $scope.selectedQuiz = null;

    $http.get('/Api/Quiz')
          .then(function (response) {
              $scope.quizzes = response.data;

          });

    $scope.setSelectedQuizClick = function (quizObject) {
        $scope.selectedQuiz = quizObject;
    };

    $scope.setVistorName = function () {
        $scope.visitorName = $scope.tempVisitorName;
    }

    
});