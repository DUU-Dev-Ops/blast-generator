var emailGenApp = angular.module('emailGenApp', ['ui.sortable', 'ngMaterial']);

emailGenApp.controller('EmailGenCtrl', function($scope) {
	$scope.events = [];

	var reader = new FileReader;
	

	reader.onload = function(e) {
		var cleanCSV = reader.result.replace(/\cM/g, "\n"); // Remove pesky ^M chracters
		$scope.events = $.csv.toObjects(cleanCSV);
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
});
