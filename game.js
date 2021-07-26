const t = require('./table.js');
const p = require('./players.js');

class game {
	constructor() {
		this.table = new t([], {}, 0, [], 0);
	}
}