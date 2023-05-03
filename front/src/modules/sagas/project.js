/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { all, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import createType from 'lib/util/createType';
// import createSaga from 'lib/util/createSaga';
import createDummySaga from 'lib/util/createDummySaga';
import { generateDummyProject } from 'lib/util/generateDummy';

import * as projectAPI from '../../lib/api/user';

/* 1. 액션 타입 만들기 */
// Read
// prettier-ignore
export const [
  LOAD_PROJECT,
  LOAD_PROJECT_SUCCESS,
  LOAD_PROJECT_FAILURE
] = createType('project/LOAD_PROJECT');

// Create
// prettier-ignore
export const [
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE
] = createType('project/ADD_PROJECT');

// Update
// prettier-ignore
export const [
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
] = createType('project/UPDATE_PROJECT');

/* 2. 액션 객체 생성 함수 */
export const loadProject = createAction(LOAD_PROJECT, (id) => id);
export const addProject = createAction(ADD_PROJECT, (data) => data);
export const updateProject = createAction(UPDATE_PROJECT, (data) => data);

/* 3. 사가 함수 */
const loadProjectSaga = createDummySaga(LOAD_PROJECT, generateDummyProject, 'LOAD');
const addProjectSaga = createDummySaga(ADD_PROJECT, null, 'ADD');
const updateProjectSaga = createDummySaga(UPDATE_PROJECT, null, 'UPDATE');

/* 4. 와치 함수 */
function* watchLoadProject() {
  yield takeLatest(LOAD_PROJECT, loadProjectSaga);
}

function* watchAddProject() {
  yield takeLatest(ADD_PROJECT, addProjectSaga);
}

function* watchUpdateProject() {
  yield takeLatest(UPDATE_PROJECT, updateProjectSaga);
}

export function* projectSaga() {
  yield all([
    fork(watchLoadProject),
    fork(watchAddProject),
    fork(watchUpdateProject),
  ]);
}

// 실행 순서
/**
 *  dispatch(loadProject(portfolioOwnerID))
 *
 *  어? LOAD_PROJECT 액션이 발생했네?
 *  watchLoadProject()  감시를 하고 있다가
 *
 *  loadProjectSaga 함수를 실행
 *
 *  어? 근데 loadProjectSaga 가 뭐지?
 *
 *  3번에서 만든 사가 함수네?
 *
 *
 *  projectAPI.getProjects =>
 *  getProjects = (portfolioOwnerId) => API.get('projects', portfolioOwnerId);
 *
 *  createSaga(LOAD_PROJECT, projectAPI.getProjects)
 *
 *  어떤 액션이 후속으로 자동으로 발생하느냐?
 *
 *  데이터를 정상적으로 받았다?
 *  LOAD_PROJECT_SUCCESS 액션이 발생 자동
 *  action.payload 에는 서버에서 받은 데이터가 들어간다.
 */
