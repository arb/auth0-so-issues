import { createReducer } from 'redux-direct';
import { uxActions } from '../actions';

export default createReducer({
  filter: '*',
  authenticating: false,
}, {
  [uxActions.changeFilter]: (state, action) => ({
    ...state, filter: action.payload,
  }),
});
