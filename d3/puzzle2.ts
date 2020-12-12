import * as fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return console.error(err);
    let lines = data.split("\n");

    // part 1
    let result1 = solution(lines, 0, 0, 0, 1, 1);
    // part 2
    let result2 = solution(lines, 0, 0, 0, 3, 1);
    // part 3
    let result3 = solution(lines, 0, 0, 0, 5, 1);
    // part 4
    let result4 = solution(lines, 0, 0, 0, 7, 1);
    // part 5
    let result5 = solution(lines, 0, 0, 0, 1, 2);
    console.log(
        "Product of trees in each path: ",
        result1 * result2 * result3 * result4 * result5,
    );
});

function getIndex(
    row: number = 0,
    column: number = 0,
    right: number,
    down: number,
): [number, number] {
    return [row + down, column + right];
}

function solution(
    lines: string[],
    total: number = 0,
    row: number,
    column: number,
    right: number,
    down: number,
): number {
    // base case
    if (row >= lines.length) {
        return total;
    }

    if (lines[row][column % lines[0].length] === "#") {
        total++;
    }
    let [newRow, newColumn] = getIndex(row, column, right, down);
    return solution(lines, total, newRow, newColumn, right, down);
}
