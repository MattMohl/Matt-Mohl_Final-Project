var themanapool = angular.module('themanapool', ['ngRoute', 'firebase']);

themanapool.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'user',
			templateUrl: 'views/home.html'
		})
		.when('/mydecks', {
			controller: 'deck',
			templateUrl: 'views/mydecks.html'
		})
		.when('/mydecks/:key', {
			controller: 'deck',
			templateUrl: 'views/editdeck.html'
		})
		.when('/mydecks/:key/comments', {
			controller: 'deck',
			templateUrl: 'views/mycomments.html'
		})
		.when('/community', {
			controller: 'deck',
			templateUrl: 'views/community.html'
		})
		.when('/community/:key', {
			controller: 'deck',
			templateUrl: 'views/viewdeck.html'
		})
		.when('/community/:key/comments', {
			controller: 'deck',
			templateUrl: 'views/deckcomments.html'
		})
		.when('/browse', {
			controller: 'browser',
			templateUrl: 'views/browse.html'
		})
		.when('/browse/sets', {
			controller: 'browser',
			templateUrl: 'views/sets.html'
		})
		.when('/browse/sets/:set', {
			controller: 'browser',
			templateUrl: 'views/set-cards.html'
		})
		.when('/browse/advanced', {
			controller: 'browser',
			templateUrl: 'views/advanced.html'
		})
		.when('/browse/advanced/results', {
			controller: 'browser',
			templateUrl: 'views/results.html'
		})
		.when('/account', {
			controller: 'user',
			templateUrl: 'views/account.html'
		})
		.otherwise({redirectTo: '/'});

}).filter('toArray', function() {
	'use strict';
	return function(obj) {
		if(!(obj instanceof Object)) {
			return obj;
		}

		return Object.keys(obj).filter(function(key) {if(key.charAt(0) !== "$") {return key;}}).map(function(key) {
			return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
		});
	};
});

themanapool.run(['$route', '$routeParams', '$rootScope', '$firebase', '$firebaseSimpleLogin', '$location', 'UserService', function($route, $routeParams, $rootScope, $firebase, $firebaseSimpleLogin, $location, userService) {
	console.log('RUN');

	$rootScope.manapool = new Firebase('https://manapool.firebaseio.com');

	// Instantiate an auth reference
	$rootScope.auth = new FirebaseSimpleLogin($rootScope.manapool, 
		function(error, user) {
			if(angular.isObject(user)) {
				console.log('is user '+user.id);

				$rootScope.currentUser = user;
				$rootScope.userFilter = {};
				$rootScope.userFilter.id = user.id;

				$rootScope.tempUser = userService.getUserInfo($rootScope.currentUser.id);
				$rootScope.tempUser.once('value', function(dataSnapshot) {
					$rootScope.currentUser.username = dataSnapshot.val().username;
					$rootScope.currentUser.currentExp = dataSnapshot.val().exp;
					$rootScope.currentUser.currentLevel = dataSnapshot.val().level;
				});
				$rootScope.decks = userService.getDecks();
				if($location.path() == '/') {
					console.log('already logged in - redirecting');
					$location.path('/browse');
				}
			}else {
				$rootScope.decks = userService.getDecks();
				console.log('not user '+user);
				// prevent non users from editing other decks
				console.log($route.current.params.key);
				if($route.current.params.key) {
					console.log('not logged in ***');
					console.log($location.url(), $location.path());
					$location.url('/mydecks');
					$location.path('/mydecks');
				}
			}
	});

	$rootScope.logout = function() {
		console.log('out');
		$rootScope.auth.logout();
		delete $rootScope.currentUser;
		$location.path('/');
	}

}]);

