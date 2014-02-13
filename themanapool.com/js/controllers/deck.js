themanapool.controller('deck', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService', 'BrowseService',
	function($route, $rootScope, $scope, $firebase, $location, userService, browseService) {

		console.log('CONTROLLER::deck');

		// Get deck key
		$scope.deckKey = $route.current.params.key;
		$scope.currentDeck = userService.getDeck($scope.deckKey);
		$scope.currentCards = userService.getDeckCards($scope.deckKey)
		console.log($scope.deckKey);



		$scope.editCard = function(num, index) {
			var deck = new Firebase('https://manapool.firebaseIO.com/decks/'+$scope.deckKey+'/');
			
			julieRef.on('value', function(snapshot) {
				if(snapshot.val() === null) {
					alert('User julie does not exist.');
				} else {
					var firstName = snapshot.val().name.first;
					var lastName = snapshot.val().name.last;
					alert('User julie’s full name is: ' + firstName + ' ' + lastName);
			  }
			});
			// console.log('deckid: '+$route.current.params.key+' || index: '+index+' || increment: '+num);
			// userService.editCard($rootScope.currentUser.id, $route.current.params.key, num, index);
		}
}]);