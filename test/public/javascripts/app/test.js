(function(){
    angular.module('myApp', [])
        .controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
            var refresh = function(){
			    $http.get('/test').success(function(response){
			        console.log('success request');
			        console.log(response);
			        $scope.test = response;
			        $scope.testdata = '';
			    });
			}

			refresh();

			$scope.addContact = function() {
			    console.log($scope.testdata);
			    $http.post('/test', $scope.testdata).success(function(response) {
			        console.log(response);
			        refresh();
			    });
			};

			$scope.remove = function(id){
			    console.log(id);
			    $http.delete('/test/' + id).success(function(response){
			        refresh();
			    });
			};

			$scope.edit = function(id){
			    console.log(id);
			    $http.get('/test/' + id).success(function(response){
			        $scope.testdata = response;
			    });
			}

			$scope.update = function() {
			    console.log($scope.testdata._id);
			    $http.put('/test/' + $scope.testdata._id, $scope.testdata).success(function(response){
			        refresh();
			    });
			};

			$scope.deselect = function() {
			    $scope.testdata = "";
			}
	}]);
})();