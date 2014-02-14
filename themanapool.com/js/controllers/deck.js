themanapool.controller('deck', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::deck');

		// Instantiate dynamic models :/
		$scope.amount = {};

		// Get deck key
		$scope.deckKey = $route.current.params.key;
		$scope.currentDeck = userService.getDeck($scope.deckKey);
		$scope.currentCards = userService.getDeckCards($scope.deckKey)
		console.log($scope.deckKey);

		$scope.changeAmount = function(index, cardKey) {
			userService.editAmount($scope.amount[index], cardKey, $scope.deckKey);
			$scope.amount[index] = '';
		}

		$scope.removeCard = function(cardKey) {
			userService.removeFromDeck(cardKey, $scope.deckKey);
		}

		$scope.addDeck = function() {
			var newdeck = {
				name: $scope.name,
				description: $scope.description,
				id: $rootScope.currentUser.id,
				status: 'Fine-Tuning',
				statusid: 'tuning'
			}
			userService.addDeck(newdeck);
			// $scope.name = $scope.description = '';
		}
}]);