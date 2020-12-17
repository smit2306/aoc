import * as fs from "fs";

function getRange(minValue: number, maxValue: number, input: string) {
    if (input === "F" || input === "L") {
        return [minValue, minValue + (maxValue - minValue + 1) / 2 - 1];
    } else if (input === "B" || input === "R") {
        return [minValue + (maxValue - minValue + 1) / 2, maxValue];
    }
}

function getSeatId(line: string): number {
    let rowNumber = 0;
    let colNumber = 0;

    let rowStart = 0;
    let rowEnd = 127;
    let colStart = 0;
    let colEnd = 7;

    // find the row
    for (let i = 0; i < 7; i++) {
        // console.log(`Loop: ${i}, rowStart: ${rowStart}, rowEnd: ${rowEnd}`);
        [rowStart, rowEnd] = getRange(rowStart, rowEnd, line[i]);
    }
    // console.log(`Final rowStart: ${rowStart}, rowEnd: ${rowEnd}`);
    rowNumber = rowEnd;

    // find the column
    for (let i = 7; i < line.length; i++) {
        // console.log(`Loop: ${i}, colStart: ${colStart}, colEnd: ${colEnd}`);
        [colStart, colEnd] = getRange(colStart, colEnd, line[i]);
    }
    colNumber = colEnd;
    // console.log(`Final colStart: ${colStart}, colEnd: ${colEnd}`);

    return rowNumber * 8 + colNumber;
}

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) console.error(err);
    const lines: string[] = data.split("\n");
    const seatIds: number[] = lines.map((value) => getSeatId(value));
    console.log("Max seat id: ", Math.max(...seatIds));
});
