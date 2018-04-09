angular.module('Pay&Stay™', ['ionic'])

// Lägg till denna metod för att visa flikarna längst ner på Android.
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position("bottom");
 })
 

.config(function($stateProvider, $urlRouterProvider){

$stateProvider
.state("tabs" , {
  url : "/tab" ,
  abstract:true,
  templateUrl : "templates/tabs.html"
})

.state("tabs.home" , {
  url : "/home" ,
  views : {
    "home-tab" : {
      templateUrl : "templates/home.html"
    }
  }
})

.state("tabs.list" , {
  url : "/list" ,
  views : {
    "list-tab" : {
      controller : "ListController",
      templateUrl: "templates/list.html"
    }
  }
}) 
.state("tabs.detail", {
  url : "/list/:aID",
  views :{
    "list-tab" : {
      templateUrl : "templates/detail.html" ,
      controller : "ListController"
    }
  }
})



})

// My Controllers
.controller("ListController", function ($scope, $http, $state, $stateParams, $ionicPopup, $filter) {
  
  $scope.data={};

  $scope.book = function () {
  
  
      $scope.dateDifference = function (checkin, checkout) {
        
              var checkin = new Date(checkin);
              var checkout = new Date(checkout);
        
              var timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
              var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
              var sumOfDays = parseInt(daysDiff);
              if (sumOfDays == 0) {
                sumOfDays = 1;
              }
              $scope.sumOfDays = sumOfDays;
              return sumOfDays;
            }
             
            $scope.today = $filter("date")(Date.now(), 'yyyy-MM-dd');
        
            $scope.getbookdate = function () {
              $scope.bookdate = $filter("date")($scope.data.checkin, 'yyyy-MM-dd');
              console.log($scope.bookdate);
            }
        
            $scope.confirm = function () {
              $scope.totalPriceFinal = ($scope.data.price - 0) * $scope.sumOfDays;
              $scope.data.days = $scope.sumOfDays;
              $scope.data.totalPrice = $scope.totalPriceFinal;
  
              console.log($scope.sumOfDays);
              console.log($scope.totalPriceFinal);
            }

          
      $ionicPopup.alert({
        title: "Booking information",
        template: "<h5> Booked room: " + "<br>" + $scope.whichroom + "</h5>" +
        "<h5> Booked by: " + "<br>" + $scope.data.firstname + " " + $scope.data.lastname + "</h5>" +
        "<hr>" +
        "<h5> Email: " + "<br>" + $scope.data.email + "</h5>" +
        "<h5> Phone number: " + "<br>" + $scope.data.tel + "</h5>" +
        "<hr>" +
        "<h5> Adults: " + "<br>" + $scope.data.adults + "</h5>" +
        "<h5> Kids: " + "<br>" + $scope.data.kids + "</h5>" +
        "<hr>" +
        "<h5> Check-in date: " + "<br>" + $scope.data.checkin + "</h5>" +
        "<h5> Check-out date: " + "<br>" + $scope.data.checkout + "</h5>" +
        "<hr>" +
        "<h3> Total amount: " + " " + $scope.totalPriceFinal + "</h3>",
      
      });

    
    }
  
  // Hämta JSON-listan via HTTP
  $http.get('model/data.json')
       .success(function(data){
         $scope.rooms = data.rooms;

         $scope.whichroom = $state.params.aID;
         console.log($scope.whichroom);
        console.log("$state : " + $state);
         console.log("$stateParams : " + $stateParams.aID);
         
         
    
          
    })
  
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  }); 
}) 
