/* eslint-disable no-shadow */
import { handleActions } from 'redux-actions';
import { GET_USERS_SUCCESS, GET_USERS_FAILURE } from 'modules/sagas/users';

const initialState = {
  users: null,
  error: null,
};

const users = handleActions(
  {
    [GET_USERS_SUCCESS]: (state, { payload: users }) => ({
      ...state,
      users,
      error: null,
    }),
    [GET_USERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default users;
