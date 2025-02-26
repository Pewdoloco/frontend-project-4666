// src/index.js
const { parseFile } = require('../parser')
const { buildDiffTree } = require('./diff');
const { stylish } = require('./formatters/stylish');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const diffTree = buildDiffTree(file1, file2);
  
  if (format === 'stylish') {
    return stylish(diffTree);
  }
  throw new Error(`Unsupported format: ${format}`);
};

module.exports = { genDiff };