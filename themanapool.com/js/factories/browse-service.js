themanapool.factory('BrowseService', ['$firebase',
	function($firebase) {
		return {
			getSets: function(num) {
				var sets = new Firebase('https://manapool-sets.firebaseio.com/');
    			return $firebase(sets.startAt().limit(num));
			},
			getSet: function(set) {
				var set = new Firebase('https://manapool-sets.firebaseio.com/'+set);
				return $firebase(set);
			},
			getSetCards: function(set, num) {
				console.log(set);
				var sets = new Firebase('https://manapool-cards.firebaseio.com/'+set+'/cards');
				return $firebase(sets.limit(num));
			}
		}
}]);