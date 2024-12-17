
const parse = (file) => {
    // object with keys of the node frequencies, with array of positions
    const map = {}
    file.forEach((line, y) => {
        line.split("").forEach((coord, x) => {
            if (coord != ".") {
                map[coord] = map[coord] === undefined
                    ? [{x,y}]
                    : map[coord].concat([{x: parseInt(x), y: parseInt(y)}])
            }
        }, {})
    },{})
    return map;
}

const createAntinodeMap = (file) => {
    return file.map(line => line.split("").map(_ => [...new Array(file[0].length).map(_ => [false])]));
}

const solve = (file, parsed) => {
    const antinodeMap = createAntinodeMap(file);
    // compare every coordinate with every other coordinate to build resonant antinodes
    for (let frequencyIndex in Object.keys(parsed)) {
        const frequency = Object.keys(parsed)[frequencyIndex];
        coordinates = parsed[frequency];
        console.log(frequency, coordinates)
        for (let i = 0; i < coordinates.length - 1; i++) {
            const coord1 = coordinates[i];
            for (let j = i + 1; j < coordinates.length; j++) {
                const coord2 = coordinates[j];
                const distance = {
                    x: parseInt(coord2.x - coord1.x),
                    y: parseInt(coord2.y - coord1.y)
                }
                const antinode1 = {
                    x: coord1.x - distance.x,
                    y: coord1.y - distance.y
                }
                if (0 <= antinode1.x && antinode1.x < file[0].length && 0 <= antinode1.y && antinode1.y < file.length) {
                    antinodeMap[antinode1.y][antinode1.x] = [true, frequency]
                    console.log("1: yep", coord1, coord2, antinode1, file[antinode1.y][antinode1.x])
                }
                const antinode2 = {
                    x: coord2.x + distance.x,
                    y: coord2.y + distance.y
                }
                if (0 <= antinode2.x && antinode2.x < file[0].length && 0 <= antinode2.y && antinode2.y < file.length) {
                    antinodeMap[antinode2.y][antinode2.x] = [true, frequency]
                    console.log("2: yep", coord1, coord2, antinode2, file[antinode2.y][antinode2.x])
                }
            }
        }
    }
    antinodeMap.forEach((line, y) => {
        line.forEach((data, x) => {
            process.stdout.write(` ${data[0] ? `X` :  " "}${file[y][x]}`);
        });
        process.stdout.write("\n");
    })
    return antinodeMap.reduce((sum, line) => sum += line.reduce((sum, data) => sum += data[0] ? 1 : 0, 0), 0);
}

const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file, parse(file));
console.log(solution);