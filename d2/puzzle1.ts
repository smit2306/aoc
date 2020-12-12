import * as fs from "fs";

function isPasswordValid(line: string): boolean {
    // parsing the sentence
    let [first_half, password] = line.split(": ");
    let [info, char] = first_half.split(" ");
    let [minOccurence, maxOccurence] = info.split("-").map((value) => {
        return parseInt(value);
    });

    // travel each char and prepare a hashmap
    let counter = {};
    for (let i = 0; i < password.length; i++) {
        if (counter[password[i]] !== undefined) {
            counter[password[i]]++;
        } else {
            counter[password[i]] = 1;
        }
    }

    // check the count of required char for validity
    if (
        counter[char] !== undefined &&
        counter[char] >= minOccurence &&
        counter[char] <= maxOccurence
    ) {
        return true;
    }
    return false;
}

function solution(lines: string[]): number {
    let boolArray: boolean[] = lines.map((value) => {
        return isPasswordValid(value);
    });
    let countValidPasswords: number = boolArray.filter(
        (value) => value === true,
    ).length;
    return countValidPasswords;
}

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        return console.error(err);
    }
    let lines = data.split("\n");
    let result = solution(lines);
    console.log("Number of valid passwords: ", result);
});

console.log("This will be printed first, Synchronous..ugh!!");
