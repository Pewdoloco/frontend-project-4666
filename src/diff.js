import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
    const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
    return keys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (!_.has(obj1, key)) {
            return {
                type: 'added',
                key,
                value: value2,
            };
        }
        if (!_.has(obj2, key)) {
            return {
                type: 'removed',
                key,
                value: value1,
            };
        }

        if (_.isObject(value1) && _.isObject(value2)) {
            return {
                type: 'nested',
                key,
                children: buildDiffTree(value1, value2),
            };
        }

        return _.isEqual(value1, value2)
            ? {
                type: 'unchanged',
                key,
                value: value1,
            }
            : {
                type: 'changed',
                key,
                oldValue: value1,
                newValue: value2,
            };
    });
};

export default buildDiffTree;
