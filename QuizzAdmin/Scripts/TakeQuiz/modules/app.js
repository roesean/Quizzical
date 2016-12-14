var app = angular.module("myApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("Default", {
        url: "/",
        templateUrl: "/Static/Default",
        
    })
        //This needs to be selectQuiz after it works
    .state("HomeView", {
        url: "/home_view",
        templateUrl: "/Static/HomeView",
        controller: "homeViewController"
    })

        //Add the stateparamater so we can hit the API and get the correct quiz
    .state("TakeQuiz", {
        url: "/take_quiz/:id",
        templateUrl: "/Static/TakeQuiz/",
        controller: "takeQuizController"
    })

        .state("SignUp", {
         url: "/sign_up/",
         templateUrl: "/Static/SignUp/",
         controller: "signUpController"
     })

})
