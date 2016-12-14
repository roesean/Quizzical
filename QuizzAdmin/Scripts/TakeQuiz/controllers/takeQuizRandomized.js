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
      $scope.questions = shuffle($scope.selectedQuiz.Questions);

      $scope.currentQuestionIndex = 0; // for testing purposes
      $scope.currentQuestion = $scope.selectedQuiz.Questions[$scope.currentQuestionIndex]; // updated in incrementQuestionIndex
      $scope.currentQuestion.Answers = shuffle($scope.currentQuestion.Answers);
      
      $scope.incorrectlyAnsweredQuestions = []; // WIP: push in the .Text of the questions that were answered incorrectly
      $scope.chosenAnswerObj = null; // answer obj
      $scope.correctAnswerCounter = 0;
      $scope.isLastQuestion = false;
      $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
      shuffle(array);
      */

      // begin test
      $scope.selectedQuiz.Questions = shuffle($scope.selectedQuiz.Questions);
      shuffleAnswers($scope.selectedQuiz);
      // end test

      // Quiz btns on landing page
      $scope.setSelectedQuizClick = function (quizObject) {
        $scope.selectedQuiz = quizObject;

        $scope.selectedQuiz.Questions = shuffle($scope.selectedQuiz.Questions);
        shuffleAnswers($scope.selectedQuiz);
      };


      function wasAnswerCorrect(question, theirAnswer) {
        if (question.CorrectAnswer == theirAnswer.Text) {
          $scope.correctAnswerCounter++;
        }
        else {
          $scope.incorrectlyAnsweredQuestions.push($scope.question.Text);
          console.log("incorrectlyAnsweredQuestions: " + $scope.incorrectlyAnsweredQuestions)
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

      function incrementQuestionIndex() {
        if ($scope.currentQuestionIndex + 1 < $scope.selectedQuiz.Questions.length && $scope.chosenAnswerObj != null) {

          wasAnswerCorrect($scope.currentQuestion, $scope.chosenAnswerObj);

          $scope.currentQuestionIndex++;

          checkIfLastQuestion();

          $scope.currentQuestion = getJsonNetObject($scope.selectedQuiz.Questions[$scope.currentQuestionIndex], $scope.quizzes);

          

          $scope.chosenAnswerObj = null;
        }
      }

      // Next btn 
      $scope.nextQuestionClick = function () {
        if ($scope.chosenAnswerObj == null) {
          alert("please select an answer");
        }

        if ($scope.currentQuestionIndex + 1 == $scope.selectedQuiz.Questions.length) {
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

      function shuffle(arr) {
        var m = arr.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);

          // And swap it with the current element.
          t = arr[m];
          arr[m] = arr[i];
          arr[i] = t;
        }

        return arr;
      }

      function shuffleAnswers(selectedQuiz) {
        for (var i = 0; i < selectedQuiz.Questions.length; i++) {
          selectedQuiz.Questions[i].Answers = shuffle(selectedQuiz.Questions[i].Answers);
        }
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
