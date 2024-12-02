const fs = require('fs');

const solve = (input) => {
    const columns = input
        .map(i => i.split("   ").map(a => parseInt(a)));

    const column1 = columns.map(i => i[0]).sort((a,b) => a - b);
    const counterMap = columns.map(i => i[1]).reduce((counterMap, number) => {
        counterMap[number] = counterMap[number] ? counterMap[number] + 1 : 1
        return counterMap;
    }, {})

    const scores = column1.map(number => (number * (counterMap[number] ?? 0)));

    return scores.reduce((similarityScore, score) => {
        return similarityScore + score;
    });
}


const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file);

console.log(solution);
