const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

const splitInHalf = (str) => {
    const mid = Math.floor(str.length / 2);
    return [str.slice(0, mid), str.slice(mid)];
};

const getMatchesForData = (data) => {
    const [start, end ] = data.split('-').map(Number);
    let res = 0;
    for (let i = start; i <= end; i++) {
        if (String(i).length % 2 === 0) {
            const halves = splitInHalf(i.toString());
            if (halves[0] === halves[1]) {
                res += Number(i);
            }
        }
    }
    return res;
}

const data = loadDataFromFile(inputFilePath).split(',');
const count = data.reduce((acc, d) => { 
    return acc + getMatchesForData(d);
}, 0);

console.log(count);