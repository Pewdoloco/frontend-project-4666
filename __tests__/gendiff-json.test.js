const path = require('path');
const { genDiff } = require('../src/index');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff with json formatter', () => {
  test('compares JSON files in json format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = genDiff(filepath1, filepath2, 'json');
    
    expect(() => JSON.parse(result)).not.toThrow();
    
    const parsedResult = JSON.parse(result);
    expect(Array.isArray(parsedResult)).toBe(true);
    
    const commonFollow = parsedResult.find(node => 
      node.key === 'common' && node.type === 'nested'
    )?.children.find(child => 
      child.key === 'follow' && child.type === 'added'
    );
    
    expect(commonFollow).toBeDefined();
    expect(commonFollow.value).toBe(false);
  });
  
  test('compares YAML files in json format', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const result = genDiff(filepath1, filepath2, 'json');
    
    expect(() => JSON.parse(result)).not.toThrow();
  });
});