import { createReducer } from 'redux-direct';
import { combineReducers } from 'redux';
import { dataActions } from '../actions';

const fetch = createReducer({
  loading: false,
  error: null,
}, {
  [dataActions.start]: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  [dataActions.fail]: state => ({
    ...state,
    loading: false,
    error: 'There was problem trying to get data, please hit refresh to try again.',
  }),
  [dataActions.success]: state => ({
    ...state,
    loading: false,
    error: null,
  }),
});

const data = createReducer({
  result: [],
}, {
  [dataActions.success]: (state, action) => ({
    ...state,
    result: action.payload,
  }),
});

export default combineReducers({
  fetch,
  data,
});
