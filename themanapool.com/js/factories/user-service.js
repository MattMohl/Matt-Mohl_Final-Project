themanapool.factory('UserService', ['$firebase',
	function($firebase) {
		var users = new Firebase('https://manapool.firebaseio.com/users');
		return {
			// Allocates storage space for a new user
			instantiateUser: function(userid, usern) {
				var user = new Firebase('https://manapool.firebaseio.com/users/'+userid)
				user.set({level: 1, exp: 0, username: usern});
			},
			getUserInfo: function(userid) {
				var user = new Firebase('https://manapool.firebaseio.com/users/'+userid);
				return user;
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
			getDeckComments: function(deckKey) {
				var comments = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/comments');
				return $firebase(comments);
			},
			addComment: function(comment, deckKey) {
				var comments = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/comments');
				comments.push(comment);
			},
			addReply: function(reply, deckKey, commentKey) {
				var replies = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/comments/'+commentKey+'/replies');
				replies.push(reply);
			},
			editAmount: function(value, cardKey, deckKey) {
				var cardRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/cards/'+cardKey);
				cardRef.update({amount: value});
			},
			incrementAmount: function(increment, cardKey, deckKey) {
				var cardRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/cards/'+cardKey);
				cardRef.once('value', function(dataSnapshot) {
					console.log(dataSnapshot.val().amount+increment);
					cardRef.update({amount: dataSnapshot.val().amount+increment});
				});
			},
			addAmount: function(cardObj, deckKey) {
				var cardsRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/cards');
				cardsRef.push(cardObj);
			},
			removeFromDeck: function(cardKey, deckKey) {
				var cardRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey+'/cards/'+cardKey);
				cardRef.remove();
			},
			updateStatus: function(newid, newstat, deckKey) {
				var deckRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey);
				deckRef.update({status: newstat, statusid: newid})
			},
			addDeck: function(deck) {
				var decksRef = new Firebase('https://manapool.firebaseio.com/decks/');
				decksRef.push(deck);
			},
			removeDeck: function(deckKey) {
				var deckRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey);
				deckRef.remove();
			},
			editDeck: function(deckKey, info) {
				var deckRef = new Firebase('https://manapool.firebaseio.com/decks/'+deckKey);
				deckRef.update({description: info.description, name: info.name});
			}
		}
}]);