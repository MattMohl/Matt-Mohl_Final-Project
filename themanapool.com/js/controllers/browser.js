themanapool.controller('browser', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::browser');

		// Get 5 sets for Browse
		if($location.path() === '/browse') {
			$scope.setList = browseService.getSets(5);
		}
		// Get all sets
		if($location.path() === '/browse/sets') {
			$scope.allSets = browseService.getSets(200);
		}
		// Browse Set Cards
		$scope.currentSet = browseService.getSet($route.current.params.set);
		$scope.setCards = browseService.getSetCards($route.current.params.set, 20);
		console.log($scope.setCards);

		// Advanced inits
		if($location.path() === '/browse/advanced') {
			$rootScope.searchParams = [];
			$rootScope.allSetsResults = browseService.getSetsLarge(200);
		}

		$scope.addParam = function(type, value) {
			$rootScope.searchParams.push({'type': type, 'value': value});
			$scope.name 		= '';
			$scope.rules 		= '';
			$scope.set 			= '';
			$scope.block 		= '';
			$scope.color 		= '';
			$scope.type 		= '';
			$scope.subtype 		= '';
			$scope.cmc 			= '';
			$scope.mana 		= '';
			$scope.power 		= '';
			$scope.toughness 	= '';
			$scope.flavor 		= '';
			$scope.artist 		= '';
			$scope.rarity 		= '';
		}

		// showResults = function(set, btn) {
			

		// 		<ul id="{{set.code}}-list">

		// 		</ul>
			
		// 	console.log(btn.style);

		// 	
		// }
}]);