/* eslint-disable no-shadow */
import { createAction, handleActions } from 'redux-actions';
import {
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
} from 'modules/sagas/auth';

const LOGOUT = 'user/LOGOUT';
const RELOGIN = 'user/RELOGIN';

export const logout = createAction(LOGOUT);
export const relogin = createAction(RELOGIN, (req) => req);

const initialState = {
  user: null,
  error: null,
};

const user = handleActions(
  {
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
      error: null,
    }),
    [RELOGIN]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [GET_CURRENT_USER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [GET_CURRENT_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default user;
