const getGuardInitialPosition = (file) => {
    let guardX = -1;
    let guardY = 0;
    for (; guardY < file.length; guardY++) {
        let line = file[guardY];
        guardX = line.indexOf("^");
        if (guardX >= 0) {
            break;
        }
    }
    return [guardX, guardY];
}
const moveGuard = (file, guardPosition, direction) => {
    const x = guardPosition[0];
    const y = guardPosition[1];
    switch (direction) {
        case "up":
            if (y - 1 >= 0) {
                if (file[y-1][x] != "#") {
                    return [[x,y-1],true, "up"];
                } else {
                    console.log("turning!");
                    return [[x,y], true, "right"];
                }
            } else {
                return [[x,y], false, "up"];
            }
        case "right":
            if (x + 1 < file[y].length) {
                if (file[y][x+1] != "#") {
                    return [[x+1,y], true, "right"];
                } else {
                    console.log("turning!");
                    return [[x,y], true, "down"];
                }
            } else {
                console.log("off the map!");
                return [[x,y], false, "right"];
            }
        case "down":
            if (y + 1 < file.length) {
                if (file[y+1][x] != "#") {
                    return [[x,y+1], true, "down"];
                } else {
                    console.log("turning!");
                    return [[x,y], true, "left"];
                }
            } else {
                console.log("off the map!");
                return [[x,y], false, "down"];
            }
        case "left":
            if (x - 1 >= 0) {
                if (file[y][x-1] != "#") {
                    return [[x-1, y], true, "left"];
                } else {
                    console.log("turning!");
                    return [[x,y], true, "up"];
                }
            } else {
                console.log("off the map!");
                return [[x,y], false, "left"];
            }
    }
}
const createStepMap = (file) => {
    let stepMap = [];
    for (let y = 0; y < file.length; y++) {
        stepMap = stepMap.concat([[...new Array(file[y].length)].fill([false])])
    }
    return stepMap;
}

const printMap = (file, stepMap, [x,y])  => {
    for (let py = 0; py < file.length; py++) {
        for (let px = 0; px < file[py].length; px++) {
            if (py == y && px == x){
                process.stdout.write("^");
            } else if (stepMap[py][px][0]) {
                if (stepMap[py][px][2]) {
                    process.stdout.write("O");
                } else {
                    switch (stepMap[py][px][1]) {
                        case "up":
                            process.stdout.write("u");
                            break;
                        case "right":
                            process.stdout.write("r");
                            break;
                        case "down":
                            process.stdout.write("d");
                            break;
                        case "left":
                            process.stdout.write("l");
                            break;
                        default:
                            process.stdout.write("X");
                    }
                }
            } else {
                process.stdout.write(file[py][px]);
            }
        }
        process.stdout.write("\n")
    }
}

/**
 * check in the direction we would go to see if we can loop
 */
const canCreateLoop = (file, stepMap, direction, [x,y]) => {
    let can = false;
    let hitBlock = false;
    switch (direction) {
        case "up":
            for (let px = x; px < file[y].length; px++) {
                can = can || (stepMap[y].some(stepSpot => !(hitBlock || (hitBlock = file[y][px] == "#") && stepSpot[0] && stepSpot[1] == "right")))
            }
            break;
        case "right":
            for (let py = y; py < file.length; py++) {
                can = can || (stepMap.some(stepLine => !(hitBlock || (hitBlock = file[py][x] == "#")) && stepLine[x][0] && stepLine[x][1] == "down"))
            }
            break;
        case "down":
            for (let px = x; px >= 0; px--) {
                can = can || (stepMap[y].some(stepSpot =>!(hitBlock || (hitBlock = file[y][px] == "#")) &&  stepSpot[0] && stepSpot[1] == "left"))
            }
            break;
        case "left":
            for (let py = y; py >= 0; py--) {
                can = can || (stepMap.some(stepLine => !(hitBlock || (hitBlock = file[py][x] == "#")) && stepLine[x][0] && stepLine[x][1] == "up"))
            }
            break;
    }
    return can;
}

const solve = (file) => {
    let [x,y] = getGuardInitialPosition(file);
    let stepMap = createStepMap(file);
    const directions = ['up', 'right', 'down', 'left'];
    let direction = directions[0];
    let guardInMap = true;
    stepMap[y][x] = [true, direction, false];
    while (guardInMap) {
        [[x,y], guardInMap, direction] = moveGuard(file, [x,y], direction)
        if (guardInMap) {
            // if we've been here before, check the direction we were going to see if an obstade would create a loop
            stepMap[y][x] = [true, direction, canCreateLoop(file, stepMap, direction, [x,y])];
        }
    }
    printMap(file, stepMap, [x,y]);
    const possibleObstades = stepMap.reduce((totalPossibleObstades, stepLine) => totalPossibleObstades += stepLine.reduce((tpo, stepData) => tpo += stepData[2] ? 1 : 0, 0), 0)
    return possibleObstades;
}


const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file);
console.log(solution);