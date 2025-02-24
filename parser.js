const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseData(content, ext) {
    switch (ext) {
        case '.json':
            return JSON.parse(content);
        case '.yaml':
        case '.yml':
            return yaml.load(content);
        default:
            throw new Error(`Unsupported file format: ${ext}`);
    }
}

function handleError(error, filePath) {
    if (error.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`);
    }
    if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in file: ${filePath}`);
    }
    if (error.name === 'YAMLException') {
        throw new Error(`Invalid YAML in file: ${filePath}`);
    }
    throw error;
}

function parseFile(filePath) {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const ext = path.extname(filePath).toLowerCase();

    try {
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        return parseData(fileContent, ext);
    } catch (error) {
        handleError(error, filePath);
    }
}

module.exports = { parseFile };