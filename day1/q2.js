const fs = require('node:fs');

const state = {
    dialPosition: 50,
    zeroCount: 0
};

const inputFilePath = process.argv[2] || './testinput.txt';

const getDirection = (instruction) => instruction[0];
const getDistance = (instruction) => Number.parseInt(instruction.slice(1), 10);

const loadInstructionsFromFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n')
        .map(instruction => instruction.trim())
        .filter(instruction => instruction.length > 0);
};

const updateDial = (dir, dist) => {
    const step = dir === 'L' ? -1 : 1;

    for (let i = 0; i < dist; i++) {
        state.dialPosition += step;

        if (state.dialPosition < 0) {
            state.dialPosition += 100;
        }

        if (state.dialPosition >= 100) {
            state.dialPosition -= 100;
        }

        if (state.dialPosition === 0) {
            state.zeroCount += 1;
        }
    }
};

const instructions = loadInstructionsFromFile(inputFilePath);

for (const instruction of instructions) {
    const dir = getDirection(instruction);
    const dist = getDistance(instruction);
    updateDial(dir, dist);

}

console.log(`Zero Count: ${state.zeroCount}`);

