const path = require('path');
const fs = require('fs');

function removeFullDir(dirPath) {
  let files = [];
	if (fs.existsSync(dirPath)) {
		files = fs.readdirSync(dirPath);
		files.forEach((filename) => {
      let curPath = path.join(dirPath, filename);
      const stat = fs.statSync(curPath);
			if(stat.isDirectory()) {
				removeFullDir(curPath);
			} else if (stat.isFile()) {
        // fs.unlinkSync(curPath);
        fs.rmSync(curPath);
      } else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(dirPath);
	}
}
function makeFullDir(dirPath) {
	if (fs.existsSync(dirPath)) {
		return true;
	} else {
		if (makeFullDir(path.dirname(dirPath))) {
			fs.mkdirSync(dirPath);
			return true;
		}
	}
}

module.exports = {
  removeFullDir,
  makeFullDir,
}