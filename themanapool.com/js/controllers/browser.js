themanapool.controller('browser', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::browser');

		// Get all sets
		$scope.fewSets = browseService.getSets(5);
		$scope.allSets = browseService.getSets(300);

		// Browse Set Cards
		$scope.currentSet = browseService.getSet($route.current.params.set);
		$scope.setCards = browseService.getSetCards($route.current.params.set, 20);
		console.log($scope.setCards);

		// Advanced inits
		if($location.path() === '/browse/advanced') {
			$rootScope.searchParams = [];
			$rootScope.allSetsResults = browseService.getSetsLarge(2000);
		}
}]);