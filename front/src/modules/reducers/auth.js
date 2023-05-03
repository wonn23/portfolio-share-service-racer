/* eslint-disable no-shadow */
/* eslint-disable import/no-duplicates */
import { createAction, handleActions } from 'redux-actions';
import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../sagas/auth';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../sagas/auth';

const initialState = {
  auth: null,
  authError: null,
};

const INITIALIZE = 'auth/INITIALIZE';
const INITWITHTOKENAUTH = 'auth/INITWITHTOKEN';

export const initAuth = createAction(INITIALIZE);
export const initWithTokenAuth = createAction(
  INITWITHTOKENAUTH,
  (user) => user,
);

const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [INITIALIZE]: () => initialState,
    [INITWITHTOKENAUTH]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
  },
  initialState,
);

export default auth;
