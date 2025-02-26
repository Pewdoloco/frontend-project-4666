#!/usr/bin/env node
// bin/gendiff.js
const { program } = require('commander');
const { genDiff } = require('../src/index');

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>', 'path to the first file')
    .argument('<filepath2>', 'path to the second file')
    .option('-f, --format [type]', 'Output format (default: stylish)', 'stylish')
    .action((filepath1, filepath2) => {
        try {
            const options = program.opts();
            const diff = genDiff(filepath1, filepath2, options.format);
            console.log(diff);
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    });

program.parse(process.argv);