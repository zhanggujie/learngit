
angular.module('starter', ['ionic','server','ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform,$rootScope,$window) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.disableScroll(true);
        // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
    // alert($window.navigator.onLine);
    $window.addEventListener("offLine",function () {
        alert("offLine");
        $rootScope.$digest();
    });
    $window.addEventListener("onLine",function () {
        alert("online");
        $rootScope.$digest()
    })
})
    .config(function ($stateProvider,$urlRouterProvider) {
      $stateProvider
          .state("hea",{
            url : "/head",
            templateUrl :"user/head.html",
            controller: "HeaderController"
          })
          .state("contact", {
              url : "/contact",
              templateUrl : "user/contact.html",
              controller : "ContactController"
          })
          .state("dynamic", {
              url : "/dynamic",
              templateUrl : "user/dynamic.html",
              controller : "DynamicController"
          })
          .state("cards", {
              url : "/cards",
              templateUrl : "user/cards.html"
          });
      $urlRouterProvider.otherwise("/head")
    })
