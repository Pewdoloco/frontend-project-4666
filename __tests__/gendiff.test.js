const { genDiff } = require('../src/index');

describe('genDiff', () => {
  const testFileComparison = (file1, file2, expectedSnapshot) => {
    it(`should compare ${file1} and ${file2}`, () => {
      const filepath1 = `__fixtures__/${file1}`;
      const filepath2 = `__fixtures__/${file2}`;
      expect(genDiff(filepath1, filepath2)).toMatchInlineSnapshot(expectedSnapshot);
    });
  };

  testFileComparison('file1.json', 'file2.json', `
"{
  - follow: false
    host: "hexlet.io"
  - proxy: "123.234.53.22"
  - timeout: 50
  + timeout: 20
  + verbose: true
}"
`);

  testFileComparison('file2.json', 'file1.json', `
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