themanapool.factory('BrowseService', ['$firebase',
	function($firebase) {
		return {
			getSets: function(num) {
				var sets = new Firebase('https://manapool-sets.firebaseio.com/');
    			return $firebase(sets.limit(num));
			},
			getSet: function(set) {
				var set = new Firebase('https://manapool-sets.firebaseio.com/'+set);
				return $firebase(set);
			},
			getSetsLarge: function(num) {
				var sets = new Firebase('https://manapool-cards.firebaseio.com/');
				return $firebase(sets.limit(num));
			},
			getSetCards: function(set, num) {
				var sets = new Firebase('https://manapool-cards.firebaseio.com/'+set+'/cards');
				return $firebase(sets.limit(num));
			}
		}
}]);