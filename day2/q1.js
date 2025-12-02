const fs = require('node:fs');

const inputFilePath = process.argv[2] || './testinput.txt';

const loadDataFromFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(',');
}

const splitInHalf = (str) => {
    const mid = Math.floor(str.length / 2);
    return [str.slice(0, mid), str.slice(mid)];
};

const getMatchesForData = (data) => {
    const [start, end ] = data.split('-');
    let res = 0;
    for (let i = Number.parseInt(start, 10); i <= Number.parseInt(end, 10); i++) {
        if (String(i).length % 2 === 0) {
            const halves = splitInHalf(i.toString());
            if (halves[0] === halves[1]) {
                res += Number(i);
            }
        }
    }
    return res;
}

const count = loadDataFromFile(inputFilePath).reduce((acc, d) => { 
    return acc + getMatchesForData(d);
}, 0);

console.log(count);