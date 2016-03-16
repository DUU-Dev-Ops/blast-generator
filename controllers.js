var emailGenApp = angular.module('emailGenApp', ['ui.sortable', 'ngMaterial']);

emailGenApp.controller('EmailGenCtrl', function($scope,$timeout, $mdSidenav, $log) {
	$scope.events = [];

	var reader = new FileReader;
	

	reader.onload = function(e) {
		$scope.events = $.csv.toObjects(reader.result)
		$scope.$apply()
	}

	$("#csv-input").on('change', function() {
		reader.readAsText($("#csv-input")[0].files[0]);
		$scope.selFile=$("#csv-input")[0].files[0].name;
		console.log($scope.selFile);
	});

	$scope.saveHTML = function() {
		var blob = new Blob([$("#generated-email").html()], {type: "text/html;charset=utf-8"});
		saveAs(blob, "email.html");
		//alert("hi")
	}
	  /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
	  $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };


	$scope.toggleLeft = buildDelayedToggler('left');
});
  emailGenApp.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
