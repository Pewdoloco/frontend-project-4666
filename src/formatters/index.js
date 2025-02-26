const { stylish } = require('./stylish');
const { plain } = require('./plain');

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

module.exports = { getFormatter };