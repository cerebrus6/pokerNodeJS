const g = require('./gameFuncs.js');
const d = require('./deck.js');
	class table {
			constructor(communityCards = [], p = {}, pot = 0, deck = [], currentRaise = 0) {
				this.communityCards = communityCards;
				this.p = p;
				this.pot = pot;
				this.deck = deck;
				this.currentRaise = currentRaise;
			}
			putCard(count, d) {
				for(let i=0; i<count; i++) {
					this.communityCards.push(g.draw(d));					
				}
			}
			newRound() {
				this.pot = 0;
				this.deck = d.originalDeck;
				this.currentRaise = 0;
				this.communityCards = [];
				let turn = 0;
				let choice;
				while(turn<this.p.arr.length) {
					let player;
					// Skip all inactive players
					// Inactive players are players who folded or with 0 money
					while(player.active == false && turn < this.p.arr.length) {
						turn+=1;
						player = this.p.arr[turn];
					}
					if(turn<this.p.arr.length) {
						let action;
						let actions = ["call", "check", "fold", "raise", "all-in"];
						let availableActions = [];
						if(this.currentRaise!=0) {
							action = await auxFuncs.input("0 - Fold, 1 - Call: ");							
						}

						// turn = 0 then the whole betting starts again
						if(this.p.arr[turn].action(choice)==0)
							turn = 0;						
					}

					turn +=1;
				}

			}
			betting() {
			}
	}
	module.exports = table;