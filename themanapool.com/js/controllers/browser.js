themanapool.controller('browser', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::browser');

		// Instantiate dynamic models :/
		$scope.amount = {};

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

		$scope.setCurrentDeck = function(deckKey) {
			console.log(deckKey);
			$rootScope.deckSelected = true;
			$rootScope.currentDeckKey = deckKey;
			$rootScope.currentDeck = userService.getDeck(deckKey);
		}

		$scope.addToCurrentDeck = function(index, card) {
			if(angular.isDefined($scope.amount[index]) && angular.isNumber($scope.amount[index]) && $rootScope.deckSelected) {
				
				var newcard = {
					amount: 		$scope.amount[index],
					multiverseid: 	card.multiverseid,
					name: 			card.name,
					type: 			card.type
				}

				if(angular.isDefined(card.manaCost)) {
					newcard.manaCost = card.manaCost;
				}
				if(angular.isDefined(card.cmc)) {
					newcard.cmc = card.cmc;
				}
				if(angular.isDefined(card.text)) {
					newcard.text = card.text;
				}
				if(angular.isDefined(card.flavor)) {
					newcard.flavor = card.flavor;
				}
				if(angular.isDefined(card.toughness)) {
					newcard.toughness = card.toughness;
				}
				if(angular.isDefined(card.power)) {
					newcard.power = card.power;
				}
				console.log(newcard);
				userService.addAmount(newcard, $rootScope.currentDeckKey);
				$scope.amount[index] = '';
			}else {
				console.log('bad');
			}
		}
}]);