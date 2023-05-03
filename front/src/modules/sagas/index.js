/* eslint-disable import/named */
/* eslint-disable no-undef */
import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userSaga } from './user';
import { usersSaga } from './users';
import { educationSaga } from './education';
import { awardSaga } from './award';
import { projectSaga } from './project';
import { certificate } from './certificate';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(usersSaga),
    fork(educationSaga),
    fork(awardSaga),
    fork(projectSaga),
    fork(certificateSaga),
  ]);
}

export default rootSaga;
