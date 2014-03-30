themanapool.controller('user', ['$route', '$rootScope', '$scope', '$firebase', '$location', 'UserService',
	function($route, $rootScope, $scope, $firebase, $location, userService){

	console.log('CONTROLLER::user');

	// View-Models
	/* 
	$scope.regForm
	$scope.logForm

	$scope.username
	$scope.email1
	$scope.p1

	$scope.email2
	$scope.p2
	*/
	
	// userService.instantiateUser('newguy');

	$scope.register = function() {
		/*
			Must create an object inside firebase for the 
			new username with:
			level -> 1
			exp -> 0
		*/
		console.log('register');

		// Create the Firebase user
		$rootScope.auth.createUser($scope.email1, $scope.p1,
			function(error, user) {
				if(!error) {
					console.log('User Id: ' + user.id + ', Email: ' + user.email);

					// Set current user, instantiate, and login
					$scope.currentUser = user;
					$scope.currentUser.username = $scope.username;
					userService.instantiateUser($scope.currentUser.id, $scope.username);
					
					$rootScope.auth.login('password', {
						email: $scope.email1,
						password: $scope.p1
					});
					$location.path('/mydecks');
				}
			});
	}

	$scope.login = function() {
		$rootScope.auth.login('password', {
			email: $scope.email2,
			password: $scope.p2
		});
		$location.path('/browse');
	}

	$scope.sendPassEmail = function() {
		$rootScope.auth.sendPasswordResetEmail($scope.email, function(error, success) {
			if (!error) {
				console.log('Password reset email sent successfully');
				$scope.email = '';
				$location.path('/home');
			}else {
				console.log(error);
				$scope.email = '';
				$location.path('/');
			}
		});
	}

	$scope.reset = function() {
		$rootScope.auth.changePassword($rootScope.currentUser.email, $scope.oldpass, $scope.newpass, function(error, success) {
			if (!error) {
				console.log('Password changed successfully');
				$location.path('/mydecks');

			}
		});
	}

}]);