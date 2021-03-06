themanapool.controller('deck', ['$route', '$filter', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $filter, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::deck');

		$rootScope.auth = new FirebaseSimpleLogin($rootScope.manapool, 
			function(error, user) {
			if(angular.isObject(user)) {
				if($location.path() == '/test') {
					$scope.players = [];
					$scope.players.push($rootScope.currentUser);
				}
			}else {
				console.log('not user '+user);
				// prevent non users from editing other decks
			}
		});

		// Instantiate dynamic models
		$scope.totalCards = 0;
		$scope.amount = {};
		$scope.replying = {};
		$scope.replyValue = {};

		// Get deck key
		$rootScope.deckKey = $route.current.params.key;
		console.log($rootScope.deckKey);
		$scope.currentDeck = userService.getDeck($rootScope.deckKey);
		$scope.currentCards = userService.getDeckCards($rootScope.deckKey);
		$scope.$watchCollection('currentCards', function() {
			$scope.totalCards = $scope.countCards($filter('toArray')($scope.currentCards));
		});
		$scope.currentComments = userService.getDeckComments($rootScope.deckKey);

		$scope.countCards = function(cards) {
			var total = 0;
			for (var i = cards.length - 1; i >= 0; i--) {
				total += cards[i].amount;
			};
			return total;
		}

		$scope.setStatus = function(statusid, status) {
			userService.updateStatus(statusid, status, $rootScope.deckKey);
		}

		$scope.addDeck = function() {
			var newdeck = {
				name: $scope.name,
				description: $scope.description,
				id: $rootScope.currentUser.id,
				status: 'Fine-Tuning',
				statusid: 'tuning',
				username: $scope.currentUser.username,
				img: 74284
			}
			userService.addDeck(newdeck);
			// $scope.name = $scope.description = '';
		}

		$scope.deleteDeck = function() {
			userService.removeDeck($rootScope.deckKey);
			$location.path('/mydecks');
		}

		$scope.editDeck = function(info) {
			console.log(info.name, info.description);
			userService.editDeck($rootScope.deckKey, info);
		}

		$scope.setDeckImage = function(multiverseid) {
			console.log('set image');
			userService.setImage($rootScope.deckKey, multiverseid);
		}

		$scope.addComment = function() {
			var newcomment = {
				title: $scope.title,
				text: $scope.text,
				id: $rootScope.currentUser.id,
				username: $rootScope.currentUser.username,
				upped: 0
			}
			userService.addComment(newcomment, $rootScope.deckKey);
			$scope.title = '';
			$scope.text = '';
		}

		$scope.addReply = function(commentKey) {
			var newreply = {
				username: $scope.currentUser.username,
				text: $scope.replyValue[commentKey]
			}
			console.log(newreply);
			if(newreply.text) {
				userService.addReply(newreply, $rootScope.deckKey, commentKey);
				$scope.replyValue[commentKey] = '';
			}
		}

		$scope.deleteComment = function(commentKey) {
			console.log(commentKey);
			userService.deleteComment($rootScope.deckKey, commentKey);
		}

		$scope.upComment = function(commentKey, userid) {
			console.log(commentKey, userid);
			userService.giveExp($rootScope.deckKey, commentKey, userid);
		}
}]);