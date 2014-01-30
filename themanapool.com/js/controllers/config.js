var themanapool = angular.module('themanapool', ['ngRoute', '$firebase']);

themanapool.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'user'
		})
		.otherwise({redirectTo: '/'});
});

themanapool.run(['$rootScope', '$firebaseAuth', '$firebase', '$location', function($rootScope, $firebaseAuth, $firebase, $location) {

	console.log('run');

}]);