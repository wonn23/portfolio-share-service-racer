import { createAction } from 'redux-actions';
import { takeLatest, all, fork } from 'redux-saga/effects';
import createType from 'lib/util/createType';
import createSaga from 'lib/util/createSaga';

import * as authAPI from '../../lib/api/user';

// prettier-ignore
export const [GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE] =
  createType('user/GET_USER');

// prettier-ignore
export const [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE] =
  createType('user/UPDATE_USER');

// get User
export const getUser = createAction(GET_USER, (id) => id);

const getUserSaga = createSaga(GET_USER, authAPI.getUser);

function* watchGetUser() {
  yield takeLatest(GET_USER, getUserSaga);
}

// update User
export const updateUser = createAction(
  UPDATE_USER,
  ({ id, name, email, description }) => ({ id, name, email, description }),
);

const updateUserSaga = createSaga(UPDATE_USER, authAPI.updateUser);

function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER, updateUserSaga);
}

export function* userSaga() {
  yield all([fork(watchGetUser), fork(watchUpdateUser)]);
}
