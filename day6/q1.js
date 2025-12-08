const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

console.log('Running:', __filename);
let data =
  loadDataFromFile(inputFilePath).trim().split('\n');

// split on all whitespace  
const dataArray = data.map(line => line.split(/\s+/).filter(Boolean));

// transpose rows to columns
const columns = dataArray[0].map((_, colIndex) => 
  dataArray.map(row => row[colIndex])
);
let total = 0;

columns.forEach(col => {
    if (col[col.length - 1] === '+')
        total += col.slice(0, -1).map(Number).reduce((a, b) => a + b, 0);
    else
        total += col.slice(0, -1).map(Number).reduce((a, b) => a * b, 1);
});

console.log(`Total: ${total}`);