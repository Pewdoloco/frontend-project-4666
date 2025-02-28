import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value) && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const plain = (diffTree) => {
  const iter = (nodes, path = '') => {
    return nodes
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const propertyPath = path ? `${path}.${node.key}` : node.key;
        
        switch (node.type) {
          case 'added':
            return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;
          case 'removed':
            return `Property '${propertyPath}' was removed`;
          case 'changed':
            return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case 'nested':
            return iter(node.children, propertyPath);
          default:
            throw new Error(`Unknown node type: ${node.type}`);
        }
      })
      .flat()
      .join('\n');
  };
  
  return iter(diffTree);
};

export default plain;
