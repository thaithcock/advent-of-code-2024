const parse = (file) => {
    const parsed = {
        rules: {},
        updates: [],
    };
    
    let flippedForParsingUpdates = false;
    for (let i = 0; i < file.length; i++) {
        if (!flippedForParsingUpdates) {
            if (file[i].trim().length) {
                const [page, mustBeBefore] = file[i].split("|");
                // the rules for a page are the list of pages is must be before
                parsed.rules[page] = parsed.rules[page] ? parsed.rules[page].concat(mustBeBefore) : [mustBeBefore]
            } else {
                flippedForParsingUpdates = true;
            }
        } else {
            parsed.updates = parsed.updates.concat([file[i].split(",")])
        }
    }

    return parsed;
}

const isValidUpdate = (rules) => (update) => {
    let isValid = true;
    console.log("Checking validity of", update);
    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        const afterCurrentPage = update.slice(i+1);
        if (rules[page]) {
            if (!rules[page].every(rule => !update.includes(rule) || afterCurrentPage.includes(rule))) {
                isValid = false;
                console.log(page, "did not follow the rules!");
                break;
            }
        }
    }
    return isValid;
}

const reorder = (rules) => (update) => {
    let reorderedUpdate = [];
    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        for (let j = i; j >= 0; j--) {
            // try adding the item, and if it isn't valid move it back an index
            let testUpdate = reorderedUpdate.concat();
            testUpdate.splice(j,0,page);
            if (isValidUpdate(rules)(testUpdate)) {
                reorderedUpdate = testUpdate;
                break;
            }
        }
    }
    console.log(update, "reordered to", reorderedUpdate);
    return reorderedUpdate;
}

const sumMiddleNumbers = (middleNumberSum, update) => {
    const middleNumber = parseInt(update[Math.floor(update.length / 2)]);
    middleNumberSum += middleNumber;
    return middleNumberSum;
}

const solve = (rules, updates) => {
    const invalidUpdates = updates.filter((update) => !isValidUpdate(rules)(update));
    const reorderedUpdates = invalidUpdates.map(reorder(rules));
    return reorderedUpdates.reduce(sumMiddleNumbers, 0);
}

const fs = require('fs');
const file = fs.readFileSync('./input.txt').toString().split("\n");
const parsed = parse(file);
const solution = solve(parsed.rules, parsed.updates);
console.log(solution);