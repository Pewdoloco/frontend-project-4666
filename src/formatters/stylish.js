import _ from 'lodash';
const INDENT_SIZE = 4;

const formatValue = (value, depth) => {
  if (!_.isObject(value)) return String(value);
  const indent = ' '.repeat(depth * INDENT_SIZE);
  const entries = Object.entries(value).map(
    ([key, value]) => `${indent}    ${key}: ${formatValue(value, depth + 1)}`
  );
  return `{\n${entries.join('\n')}\n${indent}}`;
};

const stylish = (diffTree) => {
  const iter = (nodes, depth) => {
    return nodes.map((node) => {
      const getIndent = (depth, spaces = INDENT_SIZE) => ' '.repeat(depth * spaces);
      const nodeIndent = ' '.repeat(depth * INDENT_SIZE);
      
      switch (node.type) {
        case 'added':
          return `${getIndent(depth, 2)}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'removed':
          return `${getIndent(depth, 2)}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth, 2)}- ${node.key}: ${formatValue(node.oldValue, depth + 1)}\n${getIndent(depth, 2)}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`;
        case 'unchanged':
          return `${nodeIndent}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
        case 'nested':
          return `${nodeIndent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${nodeIndent}  }`;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    }).join('\n');
  };
  
  return `{\n${iter(diffTree, 1)}\n}`;
};

export default stylish;