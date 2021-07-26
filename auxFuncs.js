const fs = require('fs');
const readline = require('readline');

	// Auxilliary Functions
	//####################################################################################################
	// Write to File
	// Input: 	file = string
	//			string = string
	// Process: Appends string to the file
	//####################################################################################################
	module.exports.writeToFile = function(file, string) {
		let content = fs.readFileSync(file, 'utf-8');
		if(content.length!=0)
			fs.appendFileSync(file, '\n', error);
		fs.appendFileSync(file, string, error);
	}
	// Error Trapping
	function error(err) {
	  if (err) throw err;
	}

	module.exports.input = function(query="") {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}