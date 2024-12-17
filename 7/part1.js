

const considerOperations = (target, total, remainingNumbers) => {
    if (!remainingNumbers.length) {
        return target === total;
    } else {
        return considerOperations(target, total + remainingNumbers[0], remainingNumbers.slice(1))
            || considerOperations(target, total * remainingNumbers[0], remainingNumbers.slice(1))
            // part 2  - comment out for part 1
            || considerOperations(target, parseInt(`${total}${remainingNumbers[0]}`), remainingNumbers.slice(1))
    }
}

const isPossible = ({result, numbers}) => {
    console.log(result, numbers)
    return considerOperations(result, 0, numbers);
}

const solve = (parsed) => {
    const possible = parsed.filter(isPossible)
    return possible.reduce((sum, parsed) => sum += parsed.result, 0)
}

const parse = (line) => {
    const numbs = line.split(" ");
    return {
        result: parseInt(numbs[0].split(":")[0]),
        numbers: numbs.slice(1).map((n) => parseInt(n)),
    }
}

const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString().split("\n");
const solution = solve(file.map(parse));
console.log(solution);