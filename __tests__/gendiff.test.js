const fs = require('fs');
const { genDiff } = require('../src/index');

describe('genDiff', () => {
  const extensions = ['json', 'yml', 'yaml'];

  const testFileComparison = (file1, file2, expectedSnapshot) => {
    extensions.forEach((ext) => {
      const filepath1 = `__fixtures__/${file1}.${ext}`;
      const filepath2 = `__fixtures__/${file2}.${ext}`;

      if (!fs.existsSync(filepath1) || !fs.existsSync(filepath2)) {
        return;
      }

      it(`should compare ${file1}.${ext} and ${file2}.${ext}`, () => {
        expect(genDiff(filepath1, filepath2)).toMatchInlineSnapshot(expectedSnapshot);
      });
    });
  };

  testFileComparison('file1', 'file2', `
"{
  - follow: false
    host: "hexlet.io"
  - proxy: "123.234.53.22"
  - timeout: 50
  + timeout: 20
  + verbose: true
}"
`);

  testFileComparison('file2', 'file1', `
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
