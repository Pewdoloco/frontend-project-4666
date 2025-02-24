// src/index.js
const { parseFile } = require('../parser');
const _ = require('lodash');

function genDiff(filepath1, filepath2) {
    const fileDataOne = parseFile(filepath1);
    const fileDataTwo = parseFile(filepath2);

    const keysOne = _.sortBy(_.keys(fileDataOne));
    const keysTwo = _.sortBy(_.keys(fileDataTwo));

    const allKeys = _.union(keysOne, keysTwo);

    const diffLines = allKeys.map(key => {
        if(!_.has(fileDataTwo, key)){
            return `    - ${key}: ${JSON.stringify(fileDataOne[key])}`;
        } else if(!_.has(fileDataOne, key)){
            return `    + ${key}: ${JSON.stringify(fileDataTwo[key])}`;
        } else if(!_.isEqual(fileDataOne[key], fileDataTwo[key])){
            return `    - ${key}: ${JSON.stringify(fileDataOne[key])}\n    + ${key}: ${JSON.stringify(fileDataTwo[key])}`;
        } else {
            return `      ${key}: ${JSON.stringify(fileDataOne[key])}`; 
        }
    })
    return `{\n${diffLines.join('\n')}\n}`;
}

module.exports = { genDiff };