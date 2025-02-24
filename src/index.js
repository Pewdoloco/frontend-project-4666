// src/index.js
const { parseFile } = require('../parser');

function genDiff(filepath1, filepath2) {
    const fileDataOne = parseFile(filepath1);
    const fileDataTwo = parseFile(filepath2);

    //...

    return { fileDataOne, fileDataTwo };
}

module.exports = { genDiff };