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
        stepMap = stepMap.concat([[...new Array(file[y].length)].fill(false)])
    }
    return stepMap;
}

const solve = (file) => {
    let [x,y] = getGuardInitialPosition(file);
    let stepMap = createStepMap(file);
    stepMap[y][x] = true;
    let guardInMap = true;
    const directions = ['up', 'right', 'down', 'left'];
    let direction = directions[0];
    while (guardInMap) {
        let oldDirection = direction;
        console.log("guard is at", [x,y], "moving", direction);
        [[x,y], guardInMap, direction] = moveGuard(file, [x,y], direction)
        if (guardInMap) {
            stepMap[y][x] = true;
            if (oldDirection != direction) {
                for (let py = 0; py < file.length; py++) {
                    for (let px = 0; px < file[py].length; px++) {
                        if (py == y && px == x){
                            process.stdout.write("^");
                        } else if (stepMap[py][px]) {
                            process.stdout.write("X");
                        } else {
                            process.stdout.write(file[py][px]);
                        }
                    }
                    process.stdout.write("\n")
                }
            }
        }
    }
    for (let y = 0; y < file.length; y++) {
        for (let x = 0; x < file[y].length; x++) {
            if (stepMap[y][x]) {
                process.stdout.write("X");
            } else {
                process.stdout.write(file[y][x]);
            }
        }
        process.stdout.write("\n")
    }
    const stepCount = stepMap.reduce((totalSteps, stepLine) => totalSteps += stepLine.reduce((lineSteps, stepped) => lineSteps += stepped ? 1 : 0, 0), 0);
    return stepCount;
}


const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file);
console.log(solution);