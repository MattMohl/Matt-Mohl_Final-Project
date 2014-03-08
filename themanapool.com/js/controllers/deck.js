themanapool.controller('deck', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::deck');

		$rootScope.auth = new FirebaseSimpleLogin($rootScope.manapool, 
			function(error, user) {
			if(angular.isObject(user)) {

			}else {
				console.log('not user '+user);
				// prevent non users from editing other decks
				console.log($route.current.params.key);
				if($route.current.params.key) {
					console.log('not logged in ***');
					console.log($location.url(), $location.path());
					$location.path('/community');
				}
			}
		});

		// Instantiate dynamic models :/
		$scope.amount = {};
		$scope.replying = {};
		$scope.replyValue = {};

		// Get deck key
		$scope.deckKey = $route.current.params.key;
		console.log($scope.deckKey);
		$scope.currentDeck = userService.getDeck($scope.deckKey);
		$scope.currentCards = userService.getDeckCards($scope.deckKey);
		$scope.currentComments = userService.getDeckComments($scope.deckKey);

		$scope.changeAmount = function(index, cardKey) {
			userService.editAmount($scope.amount[index], cardKey, $scope.deckKey);
			$scope.amount[index] = '';
		}

		$scope.upAmount = function(index, cardKey) {
			userService.incrementAmount(1, cardKey, $scope.deckKey);
		}

		$scope.downAmount = function(index, cardKey) {
			userService.incrementAmount(-1, cardKey, $scope.deckKey);
		}

		$scope.removeCard = function(cardKey) {
			userService.removeFromDeck(cardKey, $scope.deckKey);
		}

		$scope.setStatus = function(statusid, status) {
			userService.updateStatus(statusid, status, $scope.deckKey);
		}

		$scope.addDeck = function() {
			var newdeck = {
				name: $scope.name,
				description: $scope.description,
				id: $rootScope.currentUser.id,
				status: 'Fine-Tuning',
				statusid: 'tuning',
				username: $scope.currentUser.username
			}
			userService.addDeck(newdeck);
			// $scope.name = $scope.description = '';
		}

		$scope.deleteDeck = function() {
			userService.removeDeck($scope.deckKey);
			$location.path('/mydecks');
		}

		$scope.editDeck = function(info) {
			console.log(info.name, info.description);
			userService.editDeck($scope.deckKey, info);
		}

		$scope.addComment = function() {
			var newcomment = {
				title: $scope.title,
				text: $scope.text,
				id: $rootScope.currentUser.id,
				username: $rootScope.currentUser.username,
				upped: 0
			}
			userService.addComment(newcomment, $scope.deckKey);
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
				userService.addReply(newreply, $scope.deckKey, commentKey);
				$scope.replyValue[commentKey] = '';
			}
		}

		$scope.deleteComment = function(commentKey) {
			console.log(commentKey);
			userService.deleteComment($scope.deckKey, commentKey);
		}

		$scope.upComment = function(commentKey, userid) {
			console.log(commentKey, userid);
			userService.giveExp($scope.deckKey, commentKey, userid);
		}
}]);