themanapool.controller('browser', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::browser');

		// Get Magic Sets
		console.log($location.path());

		// Browse
		if($location.path() === '/browse') {
			$scope.setList = browseService.getSets(5);
		}
		// Browse Sets
		if($location.path() === '/browse/sets') {
			$scope.allSets = browseService.getSets(200);
		}
		// Browse Set Cards
		console.log($route.current.params.set);
		// if($location.path() === '/browse/sets/'+$route.current.params.set) {
			$scope.set = browseService.getSet($route.current.params.set);
			$scope.setCards = browseService.getSetCards($route.current.params.set, 20);
			console.log($scope.setCards);
		// }

}]);