themanapool.factory('UserService', ['$firebase',
	function($firebase) {
		var users = new Firebase('https://manapool.firebaseio.com/users');
		return {
			// Allocates storage space for a new user
			instantiateUser: function(userid, usern) {
				var user = new Firebase('https://manapool.firebaseio.com/users/'+userid)
				user.set({level: 1, exp: 0, username: usern});
			},
			getDecks: function() {
				var decks = new Firebase('https://manapool.firebaseio.com/decks/');
				return $firebase(decks);
			},
			getDeck: function(key) {
				var deck = new Firebase('https://manapool.firebaseio.com/decks/'+key);
				return $firebase(deck);
			},
			getDeckCards: function(key) {
				var cards = new Firebase('https://manapool.firebaseio.com/decks/'+key+'/cards');
				return $firebase(cards);
			},
			editCard: function(userid, deckid, num, index) {
				// var cardRef = $firebase(new Firebase('https://manapool.firebaseio.com/users/'+userid+'/decks/'+deckid+'/cards'));
				// var keys = cardsRef.$getIndex();
				// console.log(keys);
				// var amountRef = cardsRef.$child(keys[index]).$child('amount');
				// amountRef.once('value', function(amountSnap) {
				// 	console.log(amountSnap.val());
				// 	// y now contains the object { first: 'Fred', last: 'Flintstone' }.
				// });
			}
		}
}]);