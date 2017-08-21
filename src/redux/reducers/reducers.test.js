/* eslint-env jest */
import * as selectors from './index';

const fakePosts = [{
  tags: 'foo|bar|baz|javascript|node|node|authentication',
  creation_date: {
    value: '2014-04-09 21:49:50.503',
  },
}, {
  tags: 'javascript|node|express|node|node|authentication',
  creation_date: {
    value: '2014-08-24 18:50:53.133',
  },
}, {
  tags: 'foo|react|javascript|authentication',
  creation_date: {
    value: '2014-04-09 21:49:50.503',
  },
}, {
  tags: 'javascript|react|authentication',
  creation_date: {
    value: '2016-05-09 21:49:50.503',
  },
}, {
  tags: 'javascript|javascript|authentication',
  creation_date: {
    value: '2016-05-09 02:49:50.503',
  },
}];

const fakeState = {
  data: {
    fetch: {
      foo: 'bar',
      error: null,
    },
    data: {
      result: [],
    },
  },
  ux: {
    filter: '*',
  },
};

describe('selectors', () => {
  it('getFetch() returns the fetch part of the tree', () => {
    expect(selectors.getFetch(fakeState)).toEqual({
      foo: 'bar',
      error: null,
    });
  });

  it('getData() returns the data part of the tree', () => {
    expect(selectors.getData(fakeState)).toEqual({
      result: [],
    });
  });

  it('getUx reutrns the ux part of the tree', () => {
    expect(selectors.getUx(fakeState)).toEqual({
      filter: '*',
    });
  });

  describe('needData()', () => {
    it('returns true if we need to fetch data', () => {
      const state = { ...fakeState };
      state.data.fetch.loading = false;
      expect(selectors.needData(state)).toBe(true);
    });

    it('returns false if we do not need to fetch data', () => {
      const state = { ...fakeState };
      state.data.fetch.loading = false;
      expect(selectors.needData(state)).toBe(true);
    });
  });

  describe('getTagCounts()', () => {
    it('returns an array of objects where there is greater than 4 of that tag', () => {
      const result = selectors.getTagCounts({
        result: fakePosts,
      }, {
        filter: '*',
      });
      expect(result).toEqual([{ tag: 'javascript', value: 6 }, { tag: 'node', value: 5 }]);
    });

    it('has a defualt value', () => {
      const result = selectors.getTagCounts({
        result: [],
      }, {
        filter: null,
      });
      expect(result).toEqual([]);
    });
  });

  describe('getTimeCounts()', () => {
    it('returns an array of objects with a date and the number of issues', () => {
      const result = selectors.getTimeCounts({
        result: fakePosts,
      });
      expect(result).toEqual([
        { date: '2014/04', count: 2 },
        { date: '2014/08', count: 1 },
        { date: '2016/05', count: 2 }]);
    });
  });
});
