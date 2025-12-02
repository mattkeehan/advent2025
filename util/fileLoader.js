const fs = require('node:fs');

const inputFilePath = process.argv[2] || './testinput.txt';

const loadDataFromFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

module.exports = { inputFilePath, loadDataFromFile };
