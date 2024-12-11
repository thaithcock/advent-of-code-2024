const X = "X"
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
    // right
    if ((y + 3 < width && lines[x][y] == X && lines[x][y+1] == M && lines[x][y+2] == A && lines[x][y+3] == S)) {
        count += 1
    }

    //diagonal down right
    if ((x + 3 < height && y + 3 < width && lines[x][y] == X && lines[x+1][y+1] == M && lines[x+2][y+2] == A && lines[x+3][y+3] == S )) {
        count += 1
    }

    //down
    if ((x + 3 < height && lines[x][y] == X && lines[x+1][y] == M && lines[x+2][y] == A && lines[x+3][y] == S )) {

        //console.log(lines[x][y]  + lines[x+1][y]  + lines[x+2][y]  + lines[x+3][y] )
        count += 1
    }
    
    //diagonal down left
    if ((x + 3 < height && y - 3 >= 0 && lines[x][y] == X && lines[x+1][y-1] == M && lines[x+2][y-2] == A && lines[x+3][y-3] == S )) {

        //console.log(lines[x][y] + lines[x+1][y-1] + lines[x+2][y-2] + lines[x+3][y-3] )
        count += 1
    }

    //left
    if ((y - 3 >= 0 && lines[x][y] == X && lines[x][y-1] == M && lines[x][y-2] == A && lines[x][y-3] == S )) {

        //console.log(lines[x][y] + lines[x][y-1] + lines[x][y-2] + lines[x][y-3] )
        count += 1
    }

    //diagonal left up
    if ((x - 3 >= 0 && y - 3 >= 0 && lines[x][y] == X && lines[x-1][y-1] == M && lines[x-2][y-2] == A && lines[x-3][y-3] == S )) {

        //console.log(lines[x][y] + lines[x-1][y-1] + lines[x-2][y-2] + lines[x-3][y-3] )
        count += 1
    }

    //up
    if ((x - 3 >= 0 && lines[x][y] == X && lines[x-1][y] == M && lines[x-2][y] == A && lines[x-3][y] == S )) {
        //console.log(lines[x][y] + lines[x-1][y] + lines[x-2][y] + lines[x-3][y] )
        count += 1
    }

    //diagonal right up
    if ((x - 3 >= 0 && y + 3 < width 
        && lines[x][y] == X
        && lines[x-1][y+1] == M
        && lines[x-2][y+2] == A
        && lines[x-3][y+3] == S 
    )) {
        //console.log(lines[x][y] + lines[x-1][y+1] + lines[x-2][y+2] + lines[x-3][y+3])
        count += 1
    }
    return count
}

const solve = (lines) => {
    xmases = 0
    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[x].length; y++) {
            found = 0;
            if (lines[x][y] == X) {
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