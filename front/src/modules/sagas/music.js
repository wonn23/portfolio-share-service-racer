import { all, fork, takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import createType from 'lib/util/createType';
import createSaga from 'lib/util/createSaga';

import * as musicAPI from '../../lib/api/user';

// prettier-ignore
export const [
  LOAD_MUSICS,
  LOAD_MUSICS_SUCCESS,
  LOAD_MUSICS_FAILURE,
] = createType('music/LOAD_MUSIC');

// prettier-ignore
export const [
  LOAD_COVER,
  LOAD_COVER_SUCCESS,
  LOAD_COVER_FAILURE,
] = createType('music/LOAD_COVER');

// prettier-ignore
export const [
  ADD_MUSIC,
  ADD_MUSIC_SUCCESS,
  ADD_MUSIC_FAILURE,
] = createType('music/ADD_MUSIC');

export const loadMusic = createAction(LOAD_MUSICS, (id) => id);
export const loadCover = createAction(LOAD_COVER, (coverID) => coverID);
export const addMusic = createAction(ADD_MUSIC, (data) => data);

const loadMusicsSaga = createSaga(LOAD_MUSICS, musicAPI.getMusicList);
const loadCoverSaga = createSaga(LOAD_COVER, musicAPI.getMusicCover);
const addMusicSaga = createSaga(ADD_MUSIC, musicAPI.addMusicSong);

function* watchLoadMusicsSaga() {
  yield takeLatest(LOAD_MUSICS, loadMusicsSaga);
}

function* watchLoadCoverSaga() {
  yield takeLatest(LOAD_COVER, loadCoverSaga);
}

function* watchAddMusic() {
  yield takeLatest(ADD_MUSIC, addMusicSaga);
}

export function* musicsSaga() {
  yield all([
    fork(watchLoadMusicsSaga),
    fork(watchLoadCoverSaga),
    fork(watchAddMusic),
  ]);
}
