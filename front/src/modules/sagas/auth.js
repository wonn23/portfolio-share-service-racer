/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import { takeLatest, all, fork } from 'redux-saga/effects';
import createType from 'lib/util/createType';
import createSaga from 'lib/util/createSaga';

import * as authAPI from '../../lib/api/user';

// prettier-ignore
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createType('auth/REGISTER');

// prettier-ignore
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = 
  createType('auth/LOGIN');

// prettier-ignore
export const [GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE] =
  createType('auth/GET_CURRENT_USER');

// login
export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));

const loginSaga = createSaga(LOGIN, authAPI.login);

function* watchLogin() {
  yield takeLatest(LOGIN, loginSaga);
}

// register
export const register = createAction(REGISTER, ({ email, password, name }) => ({
  email,
  password,
  name,
}));

const registerSaga = createSaga(REGISTER, authAPI.register);

function* watchRegister() {
  yield takeLatest(REGISTER, registerSaga);
}

// using Token to get current User
export const getCurrentUser = createAction(GET_CURRENT_USER);

const getCurrentUserSaga = createSaga(GET_CURRENT_USER, authAPI.getCurrentUser);

function* watchGetCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUserSaga);
}

export function* authSaga() {
  yield all([fork(watchLogin), fork(watchRegister), fork(watchGetCurrentUser)]);
}
