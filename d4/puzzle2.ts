import * as fs from "fs";
type passportContainer = {
    byr?: string;
    iyr?: string;
    eyr?: string;
    hgt?: string;
    hcl?: string;
    ecl?: string;
    pid?: string;
    cid?: string;
};

// convert string to passport objects
function getKeyValuePairs(passportString: string): passportContainer {
    const inputFields = passportString.split(" ");
    const container: passportContainer = {};
    inputFields.forEach((element) => {
        const [key, value] = element.split(":");
        container[key] = value;
    });
    return container;
}

// validation functions
function validateNumFields(passport: passportContainer): boolean {
    if (
        passport.byr &&
        passport.iyr &&
        passport.eyr &&
        passport.ecl &&
        passport.hgt &&
        passport.hcl &&
        passport.pid
    ) {
        return true;
    }
    return false;
}

// validation functions
function inRange(data: string, minValue: number, maxValue: number): boolean {
    const parsed = parseInt(data);
    if (!isNaN(parsed)) {
        return parsed >= minValue && parsed <= maxValue;
    }
    return false;
}

// validation functions
function validateHgt(data: string): boolean {
    const unit: string = data.slice(data.length - 2);
    const length: string = data.slice(0, data.length - 2);

    if (unit === "cm") {
        return inRange(length, 150, 193);
    } else if (unit === "in") {
        return inRange(length, 59, 76);
    }
    return false;
}

// validation functions
function validateHcl(data: string): boolean {
    if (data.length !== 7) {
        return false;
    }
    const pattern = /^#[a-f0-9]{6}/;
    const foundArr = data.match(pattern);
    if (foundArr) {
        return foundArr[0].length === data.length;
    }
    return false;
}

// validation functions
function validateEcl(data: string): boolean {
    const validColors: string[] = [
        "amb",
        "blu",
        "brn",
        "gry",
        "grn",
        "hzl",
        "oth",
    ];
    return validColors.includes(data);
}

// validation functions
function validatePid(data: string): boolean {
    if (data.length !== 9) {
        return false;
    }
    const pattern = /\d{9}/;
    const foundArr = data.match(pattern);
    if (foundArr) {
        return foundArr[0].length === data.length;
    }
    return false;
}

// validation functions
function validatePassport(passport: passportContainer): boolean {
    // first check if all fields exist
    if (!validateNumFields(passport)) {
        return false;
    }

    let checkByr = false;
    let checkIyr = false;
    let checkEyr = false;
    let checkHgt = false;
    let checkHcl = false;
    let checkEcl = false;
    let checkPid = false;

    checkByr = inRange(passport.byr, 1920, 2002);
    checkIyr = inRange(passport.iyr, 2010, 2020);
    checkEyr = inRange(passport.eyr, 2020, 2030);
    checkHgt = validateHgt(passport.hgt);
    checkHcl = validateHcl(passport.hcl);
    checkEcl = validateEcl(passport.ecl);
    checkPid = validatePid(passport.pid);

    // console.log("CheckByr: ", checkByr);
    // console.log("CheckIyr: ", checkIyr);
    // console.log("CheckEyr: ", checkEyr);
    // console.log("CheckHgt: ", checkHgt);
    // console.log("CheckHcl: ", checkHcl);
    // console.log("CheckEcl: ", checkEcl);
    // console.log("CheckPid: ", checkPid);

    return (
        checkByr &&
        checkIyr &&
        checkEyr &&
        checkHgt &&
        checkHcl &&
        checkEcl &&
        checkPid
    );
}

fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return console.error(err);
    let lines: string[] = data.split("\n\n");
    lines = lines.map((value) => value.replace(/\n/g, " "));
    console.log("Total number of passports: ", lines.length);

    // passport objects
    const passports: passportContainer[] = lines.map((value) =>
        getKeyValuePairs(value),
    );
    const countValidPassports: number = passports
        .map((value) => validatePassport(value))
        .filter((value) => value === true).length;
    console.log("Total number of valid passports: ", countValidPassports);
});
