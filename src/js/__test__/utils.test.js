import { filterObject } from '../utils';

const FILTER_OBJECT_TEST_DATA = [
  {
    args: {
      filter: /^task/,
      object: {
        task1: {},
        name: {},
        value: {},
      },
    },
    expected: {
      task1: {},
    },
  },
  {
    args: {
      filter: /^name/,
      object: {
        task1: {},
        name: {},
        value: {},
      },
    },
    expected: {
      name: {},
    },
  },
  {
    args: {
      filter: /^ggg/,
      object: {
        task1: {},
        name: {},
        value: {},
      },
    },
    expected: {},
  },
];

const filterObjectHandler = test.each(FILTER_OBJECT_TEST_DATA);

filterObjectHandler('filter object test', ({ args, expected }) => {
  const actual = filterObject(args.object, args.filter);

  expect(actual).toEqual(expected);
});
