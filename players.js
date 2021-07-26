	const player = require('./player.js');
	const g = require('./gameFuncs.js');
	// Players Class
	class players {
		constructor(arr=[]) {
			this.arr = arr;
		}
		activateAll() {
			this.arr.forEach((currentValue, index, arr) => {
				arr[index].active = true;
			});
		}
		addPlayer(name = "", cards = [], money = 10) {
			let n = this.arr.length + 1;
			if(name.length==0)
				name = "player".concat(n.toString());
			let newPlayer = new player(name, cards, money);
			this.arr.push(newPlayer);
		}
		winner(table) {
			let maxScore = g.bestCombi(this.arr[0].hand.concat(table.communityCards));
			let win = [0];
			for(let i = 1; i<this.arr.length; i++) {
				if(this.arr[i].active==true) {
					let score = g.bestCombi(this.arr[i].hand.concat(table.communityCards));
					if(score>maxScore) {
						maxScore = score;
						win = [i];
					} else if(score==maxScore) {
						win.push(i);
					}
				}
			}
			console.log(g.printHand(maxScore));
			let wholeCombi = this.arr[win[0]].hand.concat(table.communityCards);
			for(let i=0; i<wholeCombi.length; i++) {
				g.printCard(wholeCombi[i][0], wholeCombi[i][1]);
			}
			return [maxScore, win];
		}
		activeCount() {
			let counter = 0;
			for(let i=0; i<this.arr.length; i++) {
				if(this.arr.active == true) {
					counter+=1;
				}
			}
			return counter;
		}
	};

	module.exports = players;