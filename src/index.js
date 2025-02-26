// src/index.js

const { parseFile } = require('../parser');
const { buildDiffTree } = require('./diff');
const { getFormatter } = require('./formatters');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const diffTree = buildDiffTree(file1, file2);
  
  const formatter = getFormatter(format);
  return formatter(diffTree);
};

module.exports = { genDiff };