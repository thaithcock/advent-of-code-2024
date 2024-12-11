const M = "M"
const A = "A"
const S = "S"
const TERMINAL_GREEN = "\x1b[32m";
const TERMINAL_RED = "\x1b[31m";
const TERMINAL_RESET = "\x1b[0m";

const findXmas = (x,y, lines) => {
    count = 0
    width = lines[x].length
    height = lines.length

    //*M - M
    // - A -
    // S - S
    if ((x + 2 < height && y + 2 < width
        && lines[x][y] == M
        && lines[x][y+2] == M
        && lines[x+1][y+1] == A
        && lines[x+2][y+2] == S
        && lines[x+2][y] == S
    )) {
        count += 1
    }

    // S - S
    // - A -
    //*M - M
    if ((x - 2 >= 0 && y + 2 < width
        && lines[x][y] == M
        && lines[x][y+2] == M
        && lines[x-1][y+1] == A
        && lines[x-2][y] == S
        && lines[x-2][y+2] == S
    )) {
        count += 1
    }

    //*M - S
    // - A -
    // M - S
    if ((x + 2 < height && y + 2 < width
        && lines[x][y] == M
        && lines[x][y+2] == S
        && lines[x+1][y+1] == A
        && lines[x+2][y] == M
        && lines[x+2][y+2] == S
    )) {
        count += 1
    }

    // S - M*
    // - A -
    // S - M
    if ((x + 2 < height && y - 2 >= 0
        && lines[x][y] == M
        && lines[x][y-2] == S
        && lines[x+1][y-1] == A
        && lines[x+2][y] == M
        && lines[x+2][y-2] == S
    )) {
        count += 1
    }

    return count
}

const solve = (lines) => {
    xmases = 0
    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[x].length; y++) {
            found = 0;
            if (lines[x][y] == M) {
                found = findXmas(x,y, lines)
                xmases += found
            }
            process.stdout.write(`${found ? TERMINAL_GREEN : TERMINAL_RED}${lines[x][y]}${TERMINAL_RESET}`);
        } 
        process.stdout.write("\n");
    }
    return xmases;
}

lines = []

const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file);
console.log(solution);