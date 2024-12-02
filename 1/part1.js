const fs = require('fs');

const solve = (input) => {
    const columns = input
        .map(i => i.split("   ").map(a => parseInt(a)));

    const column1 = columns.map(i => i[0]).sort((a,b) => a - b);
    const column2 = columns.map(i => i[1]).sort((a,b) => a - b);

    return column1.reduce((sum, number, index) => sum + Math.abs(number - column2[index]), 0)
}


const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file);

console.log(solution);
