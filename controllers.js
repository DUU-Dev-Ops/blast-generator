var emailGenApp = angular.module('emailGenApp', ['ui.sortable']);

emailGenApp.controller('EmailGenCtrl', function($scope) {
	$scope.events = [];

	var reader = new FileReader;
	

	reader.onload = function(e) {
		$scope.events = $.csv.toObjects(reader.result)
		$scope.$apply()
	}

	$("#csv-input").on('change', function() {
		reader.readAsText($("#csv-input")[0].files[0]);
	});

	$scope.saveHTML = function() {
		var blob = new Blob([$("#generated-email").html()], {type: "text/html;charset=utf-8"});
		saveAs(blob, "email.html");
		alert("hi")
	}
});