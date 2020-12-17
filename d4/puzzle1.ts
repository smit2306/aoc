import * as fs from "fs";

function validatePassport(passportString: string): boolean {
    let inputFields: string[] = passportString.replace(/ /g, ":").split(":");
    if (
        inputFields.includes("byr") &&
        inputFields.includes("iyr") &&
        inputFields.includes("eyr") &&
        inputFields.includes("hgt") &&
        inputFields.includes("hcl") &&
        inputFields.includes("ecl") &&
        inputFields.includes("pid")
    ) {
        return true;
    }
    return false;
}

// async version
fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return console.error(err);
    let lines = data.split("\n\n");
    lines = lines.map((value) => value.replace(/\n/g, " "));
    console.log("Total number of passports: ", lines.length);
    let validPassports: number = lines.filter(
        (value) => validatePassport(value) === true,
    ).length;
    console.log("Total number of valid passports: ", validPassports);
});

// sync version
// let data = fs.readFileSync("./input.txt", { encoding: "utf-8" });
// let lines = data.split("\n");
// lines.push("");

// function parseAndValidatePassports(lines: string[]) {
//     let totalPassports: number = 0;
//     let validPassports: number = 0;
//     let start: number = 0;
//     let end: number = 0;
//     for (let i = 0; i < lines.length; i++) {
//         if (lines[i] !== "") {
//             end = i;
//         } else {
//             totalPassports++;
//             let passportString: string = lines
//                 .slice(start, end + 1)
//                 .join(" ")
//                 .replace(/ /g, ":");
//             console.log(
//                 `Passport number: ${totalPassports}, i: ${i} startLine: ${
//                     start + 1
//                 }, endLine: ${end + 1}`,
//             );

//             // validate the passport
//             if (validatePassport(passportString)) {
//                 validPassports++;
//             }

//             start = end = i + 1;
//         }
//     }

//     console.log(`Total number of valid passports: ${validPassports}`);
// }

// parseAndValidatePassports(lines);
