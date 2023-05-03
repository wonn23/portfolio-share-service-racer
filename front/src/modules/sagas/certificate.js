import { all, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import createType from 'lib/util/createType';
// import createSaga from 'lib/util/createSaga';
import createDummySaga from 'lib/util/createDummySaga';
import { generateDummyCertificate } from 'lib/util/generateDummy';

import * as certificateAPI from '../../lib/api/user';

/* 1. 액션 타입 만들기 */
// Read
// prettier-ignore
export const [
  LOAD_CERTIFICATE,
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE
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
  UPDATE_CERTIFICATE_FAILURE,
] = createType('certificate/UPDATE_CERTIFICATE');

/* 2. 액션 객체 생성 함수 */
export const loadCertificate = createAction(LOAD_CERTIFICATE, (id) => id);
export const addCertificate = createAction(ADD_CERTIFICATE, (data) => data);
export const updateCertificate = createAction(UPDATE_CERTIFICATE, (data) => data);

/* 3. 사가 함수 */
const loadCertificateSaga = createDummySaga(LOAD_CERTIFICATE, generateDummyCertificate, 'LOAD');
const addCertificateSaga = createDummySaga(ADD_CERTIFICATE, null, 'ADD');
const updateCertificateSaga = createDummySaga(UPDATE_CERTIFICATE, null, 'UPDATE');

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

export function* certificateSaga() {
  yield all([
    fork(watchLoadCertificate),
    fork(watchAddCertificate),
    fork(watchUpdateCertificate),
  ]);
}

// 실행 순서
/**
 *  dispatch(loadCertificate(portfolioOwnerID))
 *
 *  어? LOAD_CERTIFICATE 액션이 발생했네?
 *  watchLoadCertificate()  감시를 하고 있다가
 *
 *  loadCertificateSaga 함수를 실행
 *
 *  어? 근데 loadCertificateSaga 가 뭐지?
 *
 *  3번에서 만든 사가 함수네?
 *
 *
 *  certificateAPI.getCertificates =>
 *  getCertificates = (portfolioOwnerId) => API.get('certificates', portfolioOwnerId);
 *
 *  createSaga(LOAD_CERTIFICATE, certificateAPI.getCertificates)
 *
 *  어떤 액션이 후속으로 자동으로 발생하느냐?
 *
 *  데이터를 정상적으로 받았다?
 *  LOAD_CERTIFICATE_SUCCESS 액션이 발생 자동
 *  action.payload 에는 서버에서 받은 데이터가 들어간다.
 */
