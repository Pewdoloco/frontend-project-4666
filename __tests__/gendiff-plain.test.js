import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff with plain formatter', () => {
  test('compares JSON files in plain format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_plain.txt');
    
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expected);
  });
  
  test('compares YAML files in plain format', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFile('expected_plain.txt');
    
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expected);
  });
});