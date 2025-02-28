import fs from 'fs';
import path from 'path';
import parseData from './parser.js';
import { buildDiffTree } from './diff.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const file1 = parseData(fs.readFileSync(absolutePath1, 'utf-8'), format1);
  const file2 = parseData(fs.readFileSync(absolutePath2, 'utf-8'), format2);

  const diffTree = buildDiffTree(file1, file2);
  const formatter = getFormatter(format);  
  return formatter(diffTree);
};

export default genDiff;
