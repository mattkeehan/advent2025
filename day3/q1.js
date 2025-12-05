const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

const data = loadDataFromFile(inputFilePath).split('\n');

const total = data.reduce((acc, line) => {
    const lastDigit = line.slice(-1);
    const digits = line.slice(0, -1).split('');
    const largest = Math.max(...digits.map(Number));
    
    // Find first occurrence of largest digit and keep everything after it
    const largestIndex = digits.findIndex(d => Number(d) === largest);
    const remaining = digits.slice(largestIndex + 1);
    remaining.push(lastDigit);
    
    const secondLargest = Math.max(...remaining.map(Number));
    const combined = Number(`${largest}${secondLargest}`);
    
    return acc + combined;
}, 0);

console.log(`Total: ${total}`);