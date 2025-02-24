//parser.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseFile(filePath){
    const absolutePath = path.resolve(process.cwd(), filePath);
    const ext = path.extname(filePath).toLowerCase();
    try{
        const fileRead = fs.readFileSync(absolutePath, 'utf-8');
        let parseData;

        switch(ext){
            case '.json':
                parseData = JSON.parse(fileRead);
                break;
            case '.yaml':
            case '.yml':
                parseData = yaml.parse(parseRead);
                break;
            default:
                throw new Error(`Unsupported file format: ${ext}`);
        }
        return parseData;
    } catch (error) {
        if(error.code === 'ENOENT') {
            throw new Error(`File not found: ${filePath}`);
        } else if (error instanceof SyntaxError){
            throw new Error(`Invalid JSON in file: ${filePath}`);
        } else if (error.name === 'YAMLException') {
            throw new Error(`Invalid YAML in file: ${filePath}`);
        } else {
            throw error;
        }
    }
}

module.exports = { parseFile };