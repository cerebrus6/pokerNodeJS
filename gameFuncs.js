
	//####################################################################################################
	// Hand Score
	// Input: 	face = array[5]
	//			suit = array[5]
	// Output: 	score = int
	//####################################################################################################
	function handscore(face, suit) {
	 	let v, i, o, s = 1<<face[0]|1<<face[1]|1<<face[2]|1<<face[3]|1<<face[4], score;
	 	for (i=-1, v=o=0; i<5; i++, o=Math.pow(2,face[i]*4)) v += o*((v/o&15)+1);
	 	v = v % 15 - ((s/(s&-s) == 31) || (s == 0x403c) ? 3 : 1);
	 	v -= (suit[0] == (suit[1]|suit[2]|suit[3]|suit[4])) * ((s == 0x7c00) ? -5 : 1);
	 	score = [8,9,5,6,1,2,3,10,4,7];
	 	return score[v];
	}
	//####################################################################################################
	// Draw
	// Input: 	deck = array
	// Output: 	card = array[2]
	// Process: Pop a random card in the deck
	//####################################################################################################
	module.exports.draw = function(deck) {
		let suits, face, box, card, chosenSuit;
		do {
			chosenSuit = Object.keys(deck)[Math.floor(Math.random()*4)]
			// console.log(deck);
			// console.log("Suit = " + chosenSuit)
			suits = deck[chosenSuit];
			// console.log("Suit = " + suits.length)
		} while(suits.length == 0);
		face = Math.floor(Math.random()*suits.length);
		box = suits[suits.length - 1];
		suits[suits.length - 1] = suits[face];
		suits[face] = box;
		card = suits.pop();
		return [card, parseInt(chosenSuit)];
	}
	//####################################################################################################
	// Best Combination
	// Input: 	card = array
	// Output:  score = int
	// Process: Find the highest score within an array of cards
	//####################################################################################################
	module.exports.bestCombi = function(cardArray) {
		let score = 0, a, b, c, d, e, allCombi = [], counter = 0;
		let cards = cardArray.slice(0);
	// To find the maximum score in all of the combinations
		allCombi = combi(5, cardArray, ["[","]"]);
		// console.log(allCombi);
		for(a = 0; a < allCombi.length; a++) {
			score =	Math.max(score, handscore([
							allCombi[a][0][0],
							allCombi[a][1][0],
							allCombi[a][2][0],
							allCombi[a][3][0],
							allCombi[a][4][0]],[
							allCombi[a][0][1],
							allCombi[a][1][1],
							allCombi[a][2][1],
							allCombi[a][3][1],
							allCombi[a][4][1]]));
		}
		return score;
	}

	// Return the hand rank based on the score
	module.exports.printHand = function(rank) {
		let handRanks = ["", "High Card", "Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];
		return handRanks[rank];
	}

	// Print the card
	module.exports.printCard = function(face, suit) {
		let cardFaces = ["", "", "2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]
		let cardSuits = ["", "clubs", "hearts", "", "spades", "", "", "", "diamonds"];
		var cardAddress = [cardFaces[face], cardSuits[suit]];
		console.log(cardFaces[face] + " of " + cardSuits[suit]);
		return cardAddress;
	}

	//####################################################################################################
	// Combination
	// Input: 	r = int, arr = array, separator = string
	// Analogy: r is the number of pots to be filled, while arr is the list plants to be potted
	// Elaboration: Separator can be ['[',']'] to output a 2D array. Default separator outputs an array of strings.
	// Output:  Combination
	// Analogy: Output is the different ways the plants can be plotted. NOTE: ([1,2,3] == [2,3,1]) 
	//####################################################################################################
	function combi(r, arr, separator = ['"','"']) {
		const result = [];
		let combination = [];
		result.length = r;
		function combine(input, len, start) {
		  if(len === 0) {
		    // console.log( result.join(" ") ); //process here the result
		    let strSeparator = separator[1].concat(",", separator[0]);
		    combination.push(JSON.parse('['.concat(separator[0], result.join(strSeparator), separator[1], ']')));
		    return;
		  }
		  for (let i = start; i <= input.length - len; i++) {
		    result[result.length - len] = input[i];
		    combine(input, len-1, i+1 );
		  }
		} 
		combine(arr, result.length, 0);
		// console.log(combination);
		return combination;
	}

	// Winners is an array of player objects
	// 100
	// 3 Players, 1 winner, 2 loser
	// Winner bet 20, 1 person call 20, another person goes all in with 100
	// Pot is 140
	// Winner gets 60 
	// The rest gets returned to the person that went all in
	module.exports.scoring = function(winners) {
		for(let i=0; i<winners.length; i++) {
			
		}
	}