const { inputFilePath, loadDataFromFile } = require('../util/fileLoader');

console.log('Running:', __filename);
const BLANK_LINE = /\n\s*\n/;

// We only care about the first section (ranges) for part 2
let [freshIdRanges] =
  loadDataFromFile(inputFilePath)
    .trim()
    .split(BLANK_LINE)
    .map(b => b.split('\n'));

// 1. Parse lines into [start, end] pairs
let ranges = freshIdRanges.map(line => {
  const [startStr, endStr] = line.split('-');
  return {
    start: Number(startStr),
    end: Number(endStr),
  };
});

console.log('Parsed ranges:', ranges);

// 2. Sort by start, then by end
ranges.sort((a, b) => {
  if (a.start !== b.start) return a.start - b.start;
  return a.end - b.end;
});

console.log('Sorted ranges:', ranges);

// 3. Merge overlapping/touching ranges and sum their lengths
let totalFreshCount = 0;
let currentStart = ranges[0].start;
let currentEnd = ranges[0].end;

for (let i = 1; i < ranges.length; i++) {
    const { start, end } = ranges[i];

    if (start > currentEnd + 1) {
        // No overlap: close previous segment
        totalFreshCount += (currentEnd - currentStart + 1);
        currentStart = start;
        currentEnd = end;
    } else {
        // Overlapping or touching: extend current segment
        if (end > currentEnd) {
            currentEnd = end;
        }
    }
}

// Add final segment
totalFreshCount += (currentEnd - currentStart + 1);

console.log('Total distinct fresh IDs:', totalFreshCount);
