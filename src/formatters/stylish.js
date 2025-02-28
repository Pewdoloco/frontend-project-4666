import _ from 'lodash';

const INDENT_SIZE = 4;

const getIndent = (depth, spaces = INDENT_SIZE) => ' '.repeat(depth * spaces - 2);

const formatValue = (value, depth) => {
  if (!_.isObject(value) || value === null) return String(value);
  const indent = ' '.repeat(depth * INDENT_SIZE);
  const entries = Object.entries(value).map(
    ([key, val]) => `${indent}    ${key}: ${formatValue(val, depth + 1)}`,
  );
  return `{
${entries.join('\n')}
${indent}}`;
};

const stylish = (diffTree) => {
  const iter = (nodes, depth) => nodes.map((node) => {
    const indent = getIndent(depth + 1);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'changed':
        return `${indent}- ${node.key}: ${formatValue(node.oldValue, depth + 1)}\n${indent}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'nested':
        return `${indent}  ${node.key}: {
${iter(node.children, depth + 1)}
${indent}  }`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }).join('\n');
  return `{
${iter(diffTree, 0)}
}`;
};

export default stylish;
