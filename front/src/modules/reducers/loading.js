/* eslint-disable no-param-reassign */
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, (reqType) => reqType);
export const finishLoading = createAction(FINISH_LOADING, (reqType) => reqType);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, { payload: reqType }) =>
      produce(state, (draft) => {
        draft[reqType] = true;
      }),
    [FINISH_LOADING]: (state, { payload: reqType }) =>
      produce(state, (draft) => {
        draft[reqType] = false;
      }),
  },
  initialState,
);

export default loading;
