import * as fs from "fs";

function isPasswordValid(line: string): boolean {
    let [first_half, password]: string[] = line.split(": ");
    let [info, char]: string[] = first_half.split(" ");
    let [pos1, pos2]: number[] = info
        .split("-")
        .map((value) => parseInt(value));

    // no zero based indexing
    if (password[pos1 - 1] === char && password[pos2 - 1] !== char) {
        return true;
    } else if (password[pos1 - 1] !== char && password[pos2 - 1] === char) {
        return true;
    }
    return false;
}

function solution(lines: string[]): number {
    let boolArray: boolean[] = lines.map((value) => isPasswordValid(value));
    let countValidPasswords: number = boolArray.filter(
        (value) => value === true,
    ).length;
    return countValidPasswords;
}

fs.readFile("input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return console.error(err);
    let lines = data.split("\n");
    let result = solution(lines);
    console.log("Number of valid passwords: ", result);
});

console.log("This will be printed first, Synchronous..ugh!!");
