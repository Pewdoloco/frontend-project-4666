const { stylish } = require('./stylish');
const { plain } = require('./plain');
const { json } = require('./json');

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

module.exports = { getFormatter };