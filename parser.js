// parser.js (исправленный)
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const parseData = (content, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

const handleError = (error, filePath) => {
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
};

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const ext = path.extname(filePath).toLowerCase();

  try {
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return parseData(content, ext);
  } catch (error) {
    handleError(error, filePath);
  }
};

module.exports = { parseFile };