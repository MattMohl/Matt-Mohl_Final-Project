themanapool.controller('browser', ['$route', '$rootScope', '$scope', '$firebase', '$location', '$filter', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, $filter, userService, browseService) {

		console.log('CONTROLLER::browser');

		// Instantiate dynamic models :/
		$scope.amount = {};

		// Get all sets
		$scope.fewSets = browseService.getSets(5);
		$scope.allSets = browseService.getSets(300);

		// Browse Set Cards
		$scope.currentSet = browseService.getSet($route.current.params.set);
		$scope.setCards = browseService.getSetCards($route.current.params.set);
		$scope.cardLimit = 20;
		$scope.setLimit = 10;

		// Advanced inits
		if($location.path() === '/browse/advanced') {
			$rootScope.search = {};
			$rootScope.allSetsResults = browseService.getSetsLarge(2000);
		}

		// $scope.$watchCollection('allSetsResults', function(newThing, oldThing) {
  //       	// $scope.dataCount = newNames.length;
  //       	console.log($filter('toArray')(newThing).length);
  //       });

		$scope.initWatch = function(setsRef) {
			var len = $filter('toArray')(setsRef).length;
			console.log(len);
			return setsRef;
		}

		$scope.filterSets = function(sets) {
			console.log(sets.length);
			for (var i = sets.length - 1; i >= 0; i--) {
				console.log($filter('toArray')(sets[i].cards).length);
			};
			return sets;
		}

        $scope.filterCards = function(cards) {
        	console.log(cards.length);
        	// angular.forEach(cards)
        	return cards;
        }

		$scope.setCurrentDeck = function(deckKey) {
			console.log(deckKey);
			$rootScope.deckSelected = true;
			$rootScope.deckKey = deckKey;
			$rootScope.currentDeck = userService.getDeck(deckKey);
		}

		$scope.addToCurrentDeck = function(card) {
			// if(angular.isDefined($scope.amount[index]) && angular.isNumber($scope.amount[index]) && $rootScope.deckSelected) {
			if($rootScope.deckSelected) {
				
				var newcard = {
					amount: 		1,
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
				userService.addAmount(newcard, $rootScope.deckKey);
				// $scope.amount[index] = '';
			}else {
				console.log('bad');
			}
		}
}]);