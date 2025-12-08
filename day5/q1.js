const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

console.log('Running:', __filename);
const BLANK_LINE = /\n\s*\n/;
let [freshIdRanges, idsFound] =
  loadDataFromFile(inputFilePath).trim().split(BLANK_LINE).map(b => b.split('\n'));

idsFound = idsFound.map(Number);

const found = [...new Set(freshIdRanges.map(rangeLine => {
    return idsFound.filter(id => {
        if (id >= Number(rangeLine.split('-')[0]) && id <= Number(rangeLine.split('-')[1])) {
            return true;
        }
        return false;
    });
}).flat())];

console.log(`count: ${found.length}`);