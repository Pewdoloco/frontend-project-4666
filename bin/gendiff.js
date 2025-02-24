#!/usr/bin/env node
//bin/gendiff.js

const { program } = require('commander');
const { genDiff } = require('../src/index');

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>', 'path to the first file')
    .argument('<filepath2>', 'path to the second file')
    .option('-f, --format [type]',  'output format')
    .action((filepath1, filepath2) => {
        try{
            const diff = genDiff(filepath1, filepath2);
            console.log(diff);
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    })

program.parse(process.argv);