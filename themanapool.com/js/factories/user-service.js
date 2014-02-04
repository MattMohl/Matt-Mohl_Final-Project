themanapool.factory('UserService', 
	function() {
		var users = new Firebase('https://manapool.firebaseio.com/users');
		return {
			// Allocates storage space for a new user
			instantiateUser: function(userid, usern) {
				var user = new Firebase('https://manapool.firebaseio.com/users/'+userid)
				user.set({level: 1, exp: 0, username: usern});
			}
		}
});