const { genDiff } = require('../src/index');

describe('genDiff', () => {
  it('should compare file1.json and file2.json', () => {
    const filepath1 = '__fixtures__/file1.json';
    const filepath2 = '__fixtures__/file2.json';

    expect(genDiff(filepath1, filepath2)).toMatchInlineSnapshot(`
"{
  - follow: false
    host: "hexlet.io"
  - proxy: "123.234.53.22"
  - timeout: 50
  + timeout: 20
  + verbose: true
}"
`);
  });

  it('should compare file2.json and file1.json', () => {
    const filepath1 = '__fixtures__/file2.json';
    const filepath2 = '__fixtures__/file1.json';

    expect(genDiff(filepath1, filepath2)).toMatchInlineSnapshot(`
"{
    host: "hexlet.io"
  - timeout: 20
  + timeout: 50
  - verbose: true
  + follow: false
  + proxy: "123.234.53.22"
}"
`);
  });
  
});