const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

const data = loadDataFromFile(inputFilePath).split('\n');

const getBestDigit = (digits, start, maxStart) => {
    let bestDigit = "-1";
    let currentIndex = -1;
    
    for (let i = start; i <= maxStart; i++) {
        if (digits[i] > bestDigit) {
            bestDigit = digits[i];
            currentIndex = i;
            if (bestDigit === "9") break;
        }
    }
    
    return { bestDigit, currentIndex };
};

let total = 0;

for (const line of data) {
    const digits = line.split('');
    let needed = 12;
    let start = 0;
    let completeLine = "";

    while (needed > 0) {
        const maxStart = line.length - needed;
        const { bestDigit, currentIndex } = getBestDigit(digits, start, maxStart);

        completeLine += bestDigit;
        start = currentIndex + 1;
        needed--;
    }

    total += Number(completeLine);
}

console.log(`Total: ${total}`);