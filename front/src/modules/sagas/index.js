import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth';
import { userSaga } from './user';
import { usersSaga } from './users';
import { educationSaga } from './education';
import { awardSaga } from './award';
import { certificateSaga } from './certificate';
import { projectSaga } from './project';
import { musicsSaga } from './music';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(usersSaga),
    fork(educationSaga),
    fork(awardSaga),
    fork(certificateSaga),
    fork(projectSaga),
    fork(musicsSaga),
  ]);
}

export default rootSaga;
