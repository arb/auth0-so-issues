import { combineReducers } from 'redux';
import data from './data';
import ux from './ux';


export default combineReducers({
  data,
  ux,
});

export const getTagCounts = (() => {
  const cache = []; // Unbound cache
  return (data, ux) => {
    for (let index = 0; index < cache.length; index += 1) {
      const item = cache[index];
      if (item[0][0] === data.result && item[0][1] === ux.filter) {
        return item[1];
      }
    }
    const hash = {};

    // This could be done with reduce or map, but it's a big dataset and those are 
    // kind of slow
    for (let index = 0; index < data.result.length; index += 1) {
      const post = data.result[index];
      const tags = post.tags.split('|');

      for (let index = 0; index < tags.length; index += 1) {
        const tag = tags[index].toLowerCase();

        if (hash[tag]) {
          hash[tag] += 1;
        } else {
          hash[tag] = 1;
        }
      }
    }
    // These aren't really useful
    delete hash.auth0;
    delete hash.authentication;

    let result = [];

    Object.keys(hash).forEach((key) => {
      if (hash[key] >= 5) {
        result.push({
          tag: key,
          value: hash[key],
        });
      }
    });
    result.sort((a, b) => b.value - a.value);

    if (ux.filter === 'top') {
      result = result.slice(0, 10);
    }

    cache.push([[data.result, ux.filter], result]);
    return result;
  };
}
)();

export const getFetch = state => state.data.fetch;
export const getData = state => state.data.data;
export const getTimeCounts = (data) => {
  const hash = {};

  for (let index = 0; index < data.result.length; index += 1) {
    const post = data.result[index];
    const creationDate = new Date(post.creation_date.value);
    const month = creationDate.getMonth() + 1;
    const timeStamp = `${creationDate.getFullYear()}/${month > 10 ? month : `0${month}`}`;

    if (hash[timeStamp]) {
      hash[timeStamp] += 1;
    } else {
      hash[timeStamp] = 1;
    }
  }
  const result = [];

  Object.keys(hash).forEach((key) => {
    result.push({
      date: key,
      count: hash[key],
    });
  });

  return result;
};

export const needData = (state) => {
  const fetch = getFetch(state);
  const data = getData(state);

  if (fetch.loading) {
    return false;
  }
  if (data.result.length > 0) {
    return false;
  }
  return true;
};

export const getUx = state => state.ux;
