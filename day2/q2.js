const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

const isRepeatedSubstring = (str) => {
    const len = str.length;

    for (let p = 1; p <= Math.floor(len / 2); p++) {
        if (len % p !== 0) continue;
        
        const pattern = str.slice(0, p);
        if (pattern.repeat(len / p) === str) {
            return true;
        }
    }
    return false;
};

const getMatchesForData = (data) => {
    const [start, end] = data.split('-').map(Number);
    let res = 0;

    for (let i = start; i <= end; i++) {
        const s = String(i);
        if (isRepeatedSubstring(s)) {
            res += i;
        }
    }

    return res;
};

const data = loadDataFromFile(inputFilePath).split(',');
const count = data.reduce((acc, d) => { 
    return acc + getMatchesForData(d);
}, 0);

console.log(count);