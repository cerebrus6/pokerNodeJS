const g = require('./gameFuncs.js');
const auxFuncs = require('./auxFuncs.js');
	// Player Class
	class player {
		constructor(name = "player", hand = [], money = 10, betted = 0) {
			this.name = name;		// String
			this.hand = hand;		// Array [2][2]
			this.money = money;		// Int
			this.betted = betted;	// Int
			this.active = true;
		}
		fillHand(deck) {
			this.hand.push(g.draw(deck));
			this.hand.push(g.draw(deck));
		}
		emptyHand() {
			this.hand.pop();
			this.hand.pop();
		}
		check(currentTable={}, isLastPlayer=false) {
			if(isLastPlayer)
				currentTable.currentRaise = 0;
			return 1;
		}
		call(currentTable={}, isLastPlayer=false) {
			if(this.betted<currentTable.raise) {
				this.money -= (currentTable.raise-this.betted);
				currentTable.pot += (currentTable.raise-this.betted);
				if(isLastPlayer)
					currentTable.currentRaise = 0;
				return 1;
			}
			if(isLastPlayer)
				currentTable.currentRaise = 0;
			return 1;
		}
		fold(currentTable={}, isLastPlayer=false) {
			this.active = false;
			if(isLastPlayer)
				currentTable.currentRaise = 0;
			return 1;
		}
		async raise(currentTable={}, askForInput = true, val = 0) {
			let value;
			if(askForInput==true)
				value = await auxFuncs.input("Raise: ");
			else
				value = val;
			currentTable.currentRaise += value;
			let startPos = currentTable.p.arr.indexOf(this);
			currentTable.p.arr = (currentTable.p.arr.slice(startPos)).concat(currentTable.p.arr.slice(0,startPos));
			return 0;
		}
		action(currentTable={}, isLastPlayer=false) {
			switch(choice) {
				case 0:
					return this.fold();
					break;
				case 1:
					return this.check();
					break;
				case 2:
					return this.call();
					break;
				case 3:
					return this.raise();
					break;
			}
		}
	};

	module.exports = player;