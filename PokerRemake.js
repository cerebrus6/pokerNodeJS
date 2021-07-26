// Node JS
const fs = require('fs');
const player = require('./player.js');
const players = require('./players.js');
const table = require('./table.js');
const auxFuncs = require('./auxFuncs.js');
const g = require('./gameFuncs.js');
const originalDeck = require('./deck.js');

	let p, t, d;
	// Results
	fs.writeFileSync("results.txt", '', auxFuncs.error);

	//####################################################################################################
	// New Game
	// Process: Resets the values that needs to be reset
	//####################################################################################################
	function newGame(playersLength=0) {
		p = new players(); // Player hands are still empty
		d = JSON.parse(JSON.stringify(originalDeck)); // New Deck
		t = new table([], p, 0, d, 0); // Community Cards Empty, Pot is 0, and Deck is new
		for(let i=0;i<playersLength;i++) {
			t.p.addPlayer(); // Add the require number of players
		}
	}
	//####################################################################################################

	//####################################################################################################
	// New Round
	// Process: Resets the values that needs to be reset
	//####################################################################################################
	function newRound(playersArr) {
		d = JSON.parse(JSON.stringify(originalDeck));
		t = new table([], p, 0, d, 0);
		for(let i=0;i<playersArr.length;i++) {
			playersArr[i].fillHand(d);
		}
	}
	//####################################################################################################


// p = new players() You can add players to p using the addPlayer() function
// p.arr.length is the number of players
// Main
async function main() {
	try {
		newGame(2);
		newRound(t.p.arr);
		let pCount = t.p.arr.length
		// Initial Betting
		let big = t.p.arr[pCount-1];
		let small = t.p.arr[0];
		await big.raise(t, false, 2);
		small.betted = 1;
		// Actions
		// Info 
		let isLastPlayer
		for(let i = 0; i<pCount; i++) {
			isLastPlayer = (i==pCount-1)?true:false;
			if(i==pCount-1)
				p.arr[i].check(t, isLastPlayer);
			else
				p.arr[i].call(t, isLastPlayer);
		}
		// Flop
		t.communityCards.push(g.draw(d));
		t.communityCards.push(g.draw(d));
		t.communityCards.push(g.draw(d));
		for(let i = 0; i<pCount; i++) {
			isLastPlayer = (i==pCount-1)?true:false;
			p.arr[i].check();
		}
		// Turn
		t.communityCards.push(g.draw(d));
		for(let i = 0; i<pCount; i++) {
			isLastPlayer = (i==pCount-1)?true:false;
			p.arr[i].check(t, isLastPlayer);
		}
		// River
		t.communityCards.push(g.draw(d));
		for(let i = 0; i<pCount; i++) {
			isLastPlayer = (i==pCount-1)?true:false;
			p.arr[i].check(t, isLastPlayer);
		}
		console.log(p.winner(t));
		// console.log(p);

	// Night fall hand strength
	// Day break leg strength
	// End
		// let turn = 0;
		// let counter = 0;
		// if(counter==0) {
		// 	drawing();
		// 	betting();
		// 	counter+=1;
		// } else if(counter==1) {
		// 	t.communityCards.push(g.draw(d))*3;
		// 	betting();
		// 	if(player.activeCount == 1) {
		// 		win(findPlayer active)
		// 	}
		// } else if(counter==2) {
		// 	t.communityCards.push(g.draw(d))*1;
		// 	betting();
		// } else if(counter==3) {
		// 	t.communityCards.push(g.draw(d))*1;
		// }
	} catch(e) {
		// statements
		console.log(e);
	}
}
main();