import fs from 'fs';
import genDiff from '../src/index.js';

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

    testFileComparison('file1', 'file2');

    testFileComparison('file2', 'file1');
});
