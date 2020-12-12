import * as fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return console.error(err);
    let lines = data.split("\n");
});

function solution(lines: string[]) {
    let totalPassports: number = 0;
    let start: number = 0;
    let end: number = 0;
    for (let i = 0; i < lines.length; i++) {
        // do something
    }
}
