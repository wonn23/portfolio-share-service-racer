import { createAction } from 'redux-actions';
import { takeLatest, all, fork } from 'redux-saga/effects';
import createType from 'lib/util/createType';
import createSaga from 'lib/util/createSaga';

import * as authAPI from '../../lib/api/user';

// prettier-ignore
export const [GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE] =
  createType('user/GET_USERS');

// get Users
export const getUsers = createAction(GET_USERS);

const getUsersSaga = createSaga(GET_USERS, authAPI.getUsers);

function* watchGetUsers() {
  yield takeLatest(GET_USERS, getUsersSaga);
}

export function* usersSaga() {
  yield all([fork(watchGetUsers)]);
}
