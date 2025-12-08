const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');
const data = loadDataFromFile(inputFilePath).split('\n');
console.log('Running:', __filename);

// All 8 possible neighbour positions relative to a cell.
// Each pair is: [rowOffset, columnOffset]
const neighbourOffsets = [
    [-1, -1], [-1, 0], [-1, 1],[ 0, -1],[ 0, 1],[ 1, -1], [ 1, 0], [ 1, 1]
];

let accessibleRollCount = 0;

for (const [rowIndex, line] of data.entries()) {
    const characters = line.split('');

    for (const [columnIndex, character] of characters.entries()) {
        if (character !== '@') continue;
        let adjacentRollCount = 0;

        for (const [rowOffset, columnOffset] of neighbourOffsets) {
            const neighbourRowIndex = rowIndex + rowOffset;
            const neighbourColumnIndex = columnIndex + columnOffset;
            const neighbourRowString = data[neighbourRowIndex];
            if (neighbourRowString?.[neighbourColumnIndex] === '@') adjacentRollCount++;
        }

        if (adjacentRollCount < 4) accessibleRollCount++;
    }
}

console.log(`Total accessible rolls: ${accessibleRollCount}`);


