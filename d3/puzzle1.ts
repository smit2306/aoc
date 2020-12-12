import * as fs from "fs";

fs.readFile("input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return console.error(err);
    let lines = data.split("\n");
    let result = solution(lines, 0, 0, 0);
    console.log("Number of trees: ", result);
});

// given a start row and column..returns end row and column based on slope
function getIndex(
    row: number = 0,
    column: number = 0,
    slope: number = 3,
): [number, number] {
    return [row + 1, column + slope];
}

function solution(
    lines: string[],
    currentRow: number,
    currentColumn: number,
    total: number = 0,
): number {
    // base case
    if (currentRow >= lines.length) {
        return total;
    }

    // check if current position is a tree
    if (lines[currentRow][currentColumn % lines[0].length] === "#") {
        // IMPORTANT
        total++;
    }

    // calculate next postion
    let [newRow, newColumn] = getIndex(currentRow, currentColumn);
    return solution(lines, newRow, newColumn, total);
}

console.log(getIndex());

console.log("This will be printed first, Synchronous..ugh!!");

/* the pattern repeats itself horizontally..so we dont care about column getting bigger
only thing we need to check is the number of rows

Also, even though the pattern repeats itself, it is not present in the input
that's the puzzle..

if we do current column modulo length of the line
i.e currentColumn % line length
--> if column is less than line length..it returns the same number
--> if column is greater than line length..it a remainder which will be less than the line length and that will be
our current column value.
*/
