import { createActions } from 'redux-direct';

export const dataActions = createActions('fetch', {
  start: null,
  fail: null,
  success: null,
});

export const fetchQuestions = auth => (dispatch) => {
  dispatch(dataActions.start());
  global.fetch('/api/data', {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return dispatch(dataActions.fail(res));
      }
      return res.json().then((data) => {
        dispatch(dataActions.success(data));
      });
    });
};

export const uxActions = createActions({
  changeFilter: null,
});
