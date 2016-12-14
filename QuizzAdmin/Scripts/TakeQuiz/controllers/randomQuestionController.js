app.controller("takeQuizController", function ($scope, $http) {

  /*
  GLOBAL VARS
  *******************************************************************/
  $scope.users = [];
  $scope.quizzes = [];

  // QUIZ vars



  $scope.setSelectedQuizClick;

  $http.get('/Api/User') // 'user' looks for a class called user
    .then(function (response) {
      $scope.users = response.data;
      // code to run after users are returned

    });

  $http.get('/Api/Quiz')
    .then(function (response) {
      $scope.quizzes = response.data;
      // code to run after quizzes are returned
      // VARS
      $scope.selectedQuiz = null;
      $scope.selectedQuiz = $scope.quizzes[0]; // for testing purposes
      $scope.quizLength = $scope.selectedQuiz.Questions.length; // initial length, static
      $scope.questionCounter = 1; // user facing
      $scope.currentQuestionIndex = randomIntFromInterval(0, ($scope.quizLength - 1)); // for testing purposes. Must re-calc quiz length after splice before using again
      $scope.currentQuestion = getJsonNetObject($scope.selectedQuiz.Questions[$scope.currentQuestionIndex], $scope.quizzes);
      $scope.incorrectlyAnsweredQuestions = []; // WIP: push in the .Text of the questions that were answered incorrectly
      $scope.chosenAnswerObj = null;
      $scope.correctAnswerCounter = 0;
      $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      $scope.isLastQuestion = false;

      /*
      FUNCTIONS
      *******************************************************************/
      /* List:
      setSelectedQuizClick();
      wasAnswerCorrect();
      checkIfLastQuestion();
      incrementQuestionIndex();
      $scope.nextQuestionClick();
      $scope.selectedAnswerClick();
      $scope.finishBtnClick();
      */

      // Quiz btns on landing page
      $scope.setSelectedQuizClick = function (quizObject) {
        $scope.selectedQuiz = quizObject;
      };

      function wasAnswerCorrect(question, theirAnswer) {
        if (question.CorrectAnswer == theirAnswer.Text) {
          $scope.correctAnswerCounter++;
        }
        else { // need to test this
          $scope.incorrectlyAnsweredQuestions.push($scope.currentQuestion);
          console.log("incorrectlyAnsweredQuestions: " + $scope.incorrectlyAnsweredQuestions)
        }
      } 

      function checkIfLastQuestion() {
        if ($scope.questionCounter == $scope.quizLength) {
          $scope.isLastQuestion = true;
        }
        else {
          $scope.isLastQuestion = false;
        }
      }

      function incrementQuestionIndex() {
        if ($scope.questionCounter < $scope.quizLength && $scope.chosenAnswerObj != null) {

          wasAnswerCorrect($scope.currentQuestion, $scope.chosenAnswerObj);

          $scope.$scope.questionCounter++;

          checkIfLastQuestion();
          // splice so that question is not randomly selected again
          $scope.selectedQuiz.Questions.splice($scope.currentQuestionIndex, 1);

          $scope.currentQuestion = getJsonNetObject($scope.selectedQuiz.Questions[randomIntFromInterval(0, ($scope.selectedQuiz.Questions.length - 1))], $scope.quizzes);

          $scope.chosenAnswerObj = null;
        }
      }

      // Next btn 
      $scope.nextQuestionClick = function () {
        if ($scope.chosenAnswerObj == null) {
          alert("please select an answer");
        }
            
        if ($scope.questionCounter == $scope.quizLength) {
          alert("You finished!");
        }

        incrementQuestionIndex();
      }

      // Finish btn
      $scope.finishBtnClick = function () {

      }

      $scope.selectedAnswerClick = function (answerObj, IdIndex) {
        $scope.chosenAnswerObj = answerObj;

        $(".answerDivs").removeClass("answerDivSelected");
        $("#answerDiv" + IdIndex).addClass("answerDivSelected");
      }

      console.log($scope.selectedQuiz.Questions)

      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }



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

  // function to return a JSON object by $id
  // parentObj: the top level object containing all child objects as serialized by JSON.NET.
  // id: the $id value of interest
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
