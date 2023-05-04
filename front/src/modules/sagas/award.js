import { all, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import createType from 'lib/util/createType';
// import createSaga from 'lib/util/createSaga';
import createDummySaga from 'lib/util/createDummySaga';
import { generateDummyAward } from 'lib/util/generateDummy';
import createSaga from 'lib/util/createSaga';

import * as awardAPI from '../../lib/api/user';

/* 1. 액션 타입 만들기 */
// Read
// prettier-ignore
export const [
  LOAD_AWARD,
  LOAD_AWARD_SUCCESS,
  LOAD_AWARD_FAILURE
] = createType('award/LOAD_AWARD');

// Create
// prettier-ignore
export const [
  ADD_AWARD,
  ADD_AWARD_SUCCESS,
  ADD_AWARD_FAILURE
] = createType('award/ADD_AWARD');

// Update
// prettier-ignore
export const [
  UPDATE_AWARD,
  UPDATE_AWARD_SUCCESS,
  UPDATE_AWARD_FAILURE,
] = createType('award/UPDATE_AWARD');

export const [DELETE_AWARD, DELETE_AWARD_SUCCESS, DELETE_AWARD_FAILURE] =
  createType('award/DELETE_AWARD');

/* 2. 액션 객체 생성 함수 */
export const loadAward = createAction(LOAD_AWARD, (id) => id);
export const addAward = createAction(ADD_AWARD, (data) => data);
export const updateAward = createAction(UPDATE_AWARD, (data) => data);
export const deleteAward = createAction(DELETE_AWARD, (id) => id);

/* 3. 사가 함수 */
const loadAwardSaga = createSaga(LOAD_AWARD, awardAPI.getAwards);
const addAwardSaga = createSaga(ADD_AWARD, awardAPI.addAward);
const updateAwardSaga = createSaga(UPDATE_AWARD, awardAPI.updateAward);
const deleteAwardSaga = createSaga(DELETE_AWARD, awardAPI.deleteAward);

/* 4. 와치 함수 */
function* watchLoadAward() {
  yield takeLatest(LOAD_AWARD, loadAwardSaga);
}

function* watchAddAward() {
  yield takeLatest(ADD_AWARD, addAwardSaga);
}

function* watchUpdateAward() {
  yield takeLatest(UPDATE_AWARD, updateAwardSaga);
}

function* watchDeleteAward() {
  yield takeLatest(DELETE_AWARD, deleteAwardSaga);
}

export function* awardSaga() {
  yield all([
    fork(watchLoadAward),
    fork(watchAddAward),
    fork(watchUpdateAward),
    fork(watchDeleteAward),
  ]);
}
