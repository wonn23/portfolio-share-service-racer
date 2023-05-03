import { all, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import createType from 'lib/util/createType';
import createDummySaga from 'lib/util/createDummySaga';
import { generateDummyEducation } from 'lib/util/generateDummy';

import * as API from '../../lib/api/user';

// prettier-ignore
export const [
  LOAD_EDUCATION,
  LOAD_EDUCATION_SUCCESS,
  LOAD_EDUCATION_FAILURE,
] = createType('education/LOAD_EDUCATION');

// prettier-ignore
export const [
  ADD_EDUCATION,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAILURE
] = createType('education/ADD_EDUCATION');

export const [
  UPDATE_EDUCATION,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
] = createType('education/UPDATE_EDUCATION');

// 액션을 생성하는 함수
export const loadEducation = createAction(LOAD_EDUCATION, (id) => id);
export const addEducation = createAction(ADD_EDUCATION, (data) => data);
export const updateEducation = createAction(UPDATE_EDUCATION, (data) => data);

// 사가 함수
const loadEducationSaga = createDummySaga(
  LOAD_EDUCATION,
  generateDummyEducation,
  'LOAD',
);
const addEducationSaga = createDummySaga(ADD_EDUCATION, null, 'ADD');
const updateEducationSaga = createDummySaga(UPDATE_EDUCATION, null, 'UPDATE');

// 와치 함수
function* watchLoadEducation() {
  yield takeLatest(LOAD_EDUCATION, loadEducationSaga);
}
function* watchAddEducation() {
  yield takeLatest(ADD_EDUCATION, addEducationSaga);
}
function* watchUpdateEducation() {
  yield takeLatest(UPDATE_EDUCATION, updateEducationSaga);
}

// 에듀케이션 사가
export function* educationSaga() {
  yield all([
    fork(watchLoadEducation),
    fork(watchAddEducation),
    fork(watchUpdateEducation),
  ]);
}
