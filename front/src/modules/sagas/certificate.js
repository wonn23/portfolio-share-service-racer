import { all, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import createType from 'lib/util/createType';
import createSaga from 'lib/util/createSaga';
import createDummySaga from 'lib/util/createDummySaga';
import { generateDummyCertificate } from 'lib/util/generateDummy';

import * as certificateAPI from '../../lib/api/user';

/* 1. 액션 타입 만들기 */
// Read
// prettier-ignore
export const [
  LOAD_CERTIFICATE,
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
] = createType('certificate/LOAD_CERTIFICATE');

// Create
// prettier-ignore
export const [
  ADD_CERTIFICATE,
  ADD_CERTIFICATE_SUCCESS,
  ADD_CERTIFICATE_FAILURE
] = createType('certificate/ADD_CERTIFICATE');

// Update
// prettier-ignore
export const [
  UPDATE_CERTIFICATE,
  UPDATE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAILURE
] = createType('certificate/UPDATE_CERTIFICATE');

export const [
  DELETE_CERTIFICATE,
  DELETE_CERTIFICATE_SUCCESS,
  DELETE_CERTIFICATE_FAILURE,
] = createType('certificate/DELETE_CERTIFICATE');

/* 2. 액션 객체 생성 함수 */
export const loadCertificate = createAction(LOAD_CERTIFICATE, (id) => id);
export const addCertificate = createAction(ADD_CERTIFICATE, (data) => data);
export const updateCertificate = createAction(
  UPDATE_CERTIFICATE,
  (data) => data,
);
export const deleteCertificate = createAction(DELETE_CERTIFICATE, (id) => id);

/* 3. 사가 함수 */
const loadCertificateSaga = createSaga(
  LOAD_CERTIFICATE,
  certificateAPI.getCertificates,
);
const addCertificateSaga = createSaga(
  ADD_CERTIFICATE,
  certificateAPI.addCertificate,
);
const updateCertificateSaga = createSaga(
  UPDATE_CERTIFICATE,
  certificateAPI.updateCertificate,
);
const deleteCertificateSaga = createSaga(
  DELETE_CERTIFICATE,
  certificateAPI.deleteCertificate,
);

/* 4. 와치 함수 */
function* watchLoadCertificate() {
  yield takeLatest(LOAD_CERTIFICATE, loadCertificateSaga);
}

function* watchAddCertificate() {
  yield takeLatest(ADD_CERTIFICATE, addCertificateSaga);
}

function* watchUpdateCertificate() {
  yield takeLatest(UPDATE_CERTIFICATE, updateCertificateSaga);
}

function* watchDeleteCertificate() {
  yield takeLatest(DELETE_CERTIFICATE, deleteCertificateSaga);
}

export function* certificateSaga() {
  yield all([
    fork(watchLoadCertificate),
    fork(watchAddCertificate),
    fork(watchUpdateCertificate),
    fork(watchDeleteCertificate),
  ]);
}
