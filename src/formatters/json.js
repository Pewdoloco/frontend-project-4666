const json = (diffTree) => {
    return JSON.stringify(diffTree, null, 2);
  };
  
  module.exports = { json };