app.controller("takeQuizController", function ($scope, $http, $stateParams, $state) {

  /*
  GLOBAL VARS
  *******************************************************************/
  $scope.users = [];


  $scope.setSelectedQuizClick;

  $http.get('/Api/User') // 'user' looks for a class called user
    .then(function (response) {
      $scope.users = response.data;
      // code to run after users are returned

    });

  $http.get('/Api/Quiz/' + $stateParams.id)
    .then(function (response) {
      $scope.selectedQuiz = response.data;
      console.log($scope.selectedQuiz);
      // code to run after quizzes are returned
      // VARS
      $scope.currentQuestionIndex = 0; // for testing purposes
      $scope.currentQuestion = $scope.selectedQuiz.Questions[$scope.currentQuestionIndex]; // updated in incrementQuestion
      $scope.incorrectlyAnsweredQuestions = [];
      $scope.correctlyAnsweredQuestions = [];
      $scope.chosenAnswerObj = null; // answer obj
      $scope.correctAnswerCounter = 0;
      $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      $scope.isLastQuestion = false;
      $scope.scorePercent = null;

      /*
      FUNCTIONS
      *******************************************************************/
      /* List:
      runQuiz();
      setSelectedQuizClick();
      wasAnswerCorrect();
      saveIncorrectQuestion();
      saveCorrectQuestion();
      checkIfLastQuestion();
      incrementQuestion();
      $scope.nextQuestionClick();
      $scope.selectedAnswerClick();
      $scope.finishBtnClick();
      saveCorrectQuestion();
      saveIncorrectQuestion();
      calculateScore();
      */

      function runQuiz() {
        if ($scope.currentQuestionIndex + 1 <= $scope.selectedQuiz.Questions.length && $scope.chosenAnswerObj != null) {

          wasAnswerCorrect($scope.currentQuestion, $scope.chosenAnswerObj);

          incrementQuestion();

          checkIfLastQuestion();

          $scope.currentQuestion = getJsonNetObject($scope.selectedQuiz.Questions[$scope.currentQuestionIndex], $scope.selectedQuiz);

          $scope.chosenAnswerObj = null;
        }
      }

      function wasAnswerCorrect(question, theirAnswer) {
        if (question.CorrectAnswer == theirAnswer.Text) {
          $scope.correctAnswerCounter++;

          saveCorrectQuestion();
        }
        else {
          saveIncorrectQuestion();
        }
      }

      function incrementQuestion() {
        if ($scope.currentQuestionIndex + 1 < $scope.selectedQuiz.Questions.length) {

          $scope.currentQuestionIndex++;
        }
      }

      function checkIfLastQuestion() {
        if ($scope.currentQuestionIndex + 1 == $scope.selectedQuiz.Questions.length) {
          $scope.isLastQuestion = true;
        }
        else {
          $scope.isLastQuestion = false;
        }
      }

      function saveCorrectQuestion() {
        $scope.correctlyAnsweredQuestions.push($scope.currentQuestion);
      }

      function saveIncorrectQuestion() {
        $scope.currentQuestion.chosenAnswer = $scope.chosenAnswerObj;
        $scope.incorrectlyAnsweredQuestions.push($scope.currentQuestion);
      }





      // Next btn 
      $scope.nextQuestionClick = function () {
        if ($scope.chosenAnswerObj == null) {
          alert("Please Select an Answer");
        }
        else {
          runQuiz();
        }
        $(".proceedBtns").blur();
      }

      // Finish btn
      $scope.finishBtnClick = function () {
        if ($scope.chosenAnswerObj == null) {
          alert("please select an answer");
        }
        else {
          runQuiz();
          calculateScore();
          $("#quizResultsModal").modal();
        }
        $(".proceedBtns").blur();
      }

      function calculateScore() {
        $scope.scorePercent = Math.round(($scope.correctlyAnsweredQuestions.length / $scope.selectedQuiz.Questions.length) * 100)
      }

      $scope.selectedAnswerClick = function (answerObj, IdIndex) {
        $scope.chosenAnswerObj = answerObj;

        $(".answerLetters").removeClass("answerLetterSelected");
        $("#answerLetter" + IdIndex).addClass("answerLetterSelected");
      }

      // answer divs mouse over & out

      $scope.mouseOverAnswerDiv = function (IdIndex) {
        $("#answerLetterDiv" + IdIndex).addClass("pulse");

        $("#answerLetter" + IdIndex).addClass("answerLetterHighlited");
      }

      $scope.mouseLeaveAnswerDiv = function (IdIndex) {
        $(".answerLetterDivs").removeClass("pulse");

        $("#answerLetter" + IdIndex).removeClass("answerLetterHighlited");
      }

      // proceed btns mouse over and out

      $scope.mouseOverOrFocusProceedBtns = function () {

        if ($scope.chosenAnswerObj != null) {
          $(".proceedBtns").addClass("pulse");
          $(".proceedBtns").addClass("btn-success");
        }
        else {
          $(".proceedBtns").addClass("shake");
          $(".proceedBtns").addClass("btn-danger");
        }
      }

      $scope.mouseLeaveOrBlurProceedBtns = function () {
        $(".proceedBtns").removeClass("pulse");
        $(".proceedBtns").removeClass("shake");
        $(".proceedBtns").removeClass("btn-success");
        $(".proceedBtns").removeClass("btn-danger");
      }

      // proceed btns on focus and loss of focus



      // if modal closed from clicking outside of modal go to homeView

      $(document).on('hide.bs.modal', '#quizResultsModal', function () {
        $state.go('HomeView');
      });

    }); // end quiz $http.get

  /* 
  function to return a JSON object from a JSON.NET serialized object with $id/$ref key-values
   obj: the obj of interest.
   parentObj: the top level object containing all child objects as serialized by JSON.NET. 
   */
  function getJsonNetObject(obj, parentObj) {
    // check if obj has $id key.
    var objId = obj["$id"];
    if (typeof (objId) !== "undefined" && objId != null) {
      // $id key exists, so you have the actual object... return it
      return obj;
    }
    // $id did not exist, so check if $ref key exists.
    objId = obj["$ref"];
    if (typeof (objId) !== "undefined" && objId != null) {
      // $ref exists, we need to get the actual object by searching the parent object for $id
      return getJsonNetObjectById(parentObj, objId);
    }
    // $id and $ref did not exist... return null
    return null;
  }

  /* 
  function to return a JSON object by $id
  parentObj: the top level object containing all child objects as serialized by JSON.NET.
  id: the $id value of interest
  */
  function getJsonNetObjectById(parentObj, id) {
    // check if $id key exists.
    var objId = parentObj["$id"];
    if (typeof (objId) !== "undefined" && objId != null && objId == id) {
      // $id key exists, and the id matches the id of interest, so you have the object... return it
      return parentObj;
    }
    for (var i in parentObj) {
      if (typeof (parentObj[i]) == "object" && parentObj[i] != null) {
        //going one step down in the object tree
        var result = getJsonNetObjectById(parentObj[i], id);
        if (result != null) {
          // return found object
          return result;
        }
      }
    }
    return null;
  }

}) // END controller 
