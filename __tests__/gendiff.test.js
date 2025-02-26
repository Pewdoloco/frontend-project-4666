// __tests__/gendiff.test.js
const fs = require('fs');
const { genDiff } = require('../src/index');

describe('genDiff', () => {
  const extensions = ['json', 'yml', 'yaml'];

  const testFileComparison = (file1, file2) => {
    extensions.forEach((ext) => {
      const filepath1 = `__fixtures__/${file1}.${ext}`;
      const filepath2 = `__fixtures__/${file2}.${ext}`;

      if (!fs.existsSync(filepath1) || !fs.existsSync(filepath2)) {
        return;
      }

      it(`should compare ${file1}.${ext} and ${file2}.${ext}`, () => {
        expect(genDiff(filepath1, filepath2)).toMatchSnapshot();
      });
    });
  };

  testFileComparison('file1', 'file2', `
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
`);

  testFileComparison('file2', 'file1', `
{
    common: {
      - follow: false
        setting1: Value 1
      + setting2: 200
      + setting3: true
      - setting3: null
      - setting4: blah blah
      - setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              + wow: 
              - wow: so much
            }
            key: value
          - ops: vops
        }
    }
    group1: {
      + baz: bas
      - baz: bars
        foo: bar
      + nest: {
            key: value
        }
      - nest: str
    }
  + group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  - group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
`);
});