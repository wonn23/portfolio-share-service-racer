/* eslint-disable no-shadow */
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

// prettier-ignore
const LOAD_MUSIC_LIST = 'music/LOAD_MUSIC_LIST';
const PLAY_MUSIC = 'music/PLAY_MUSIC';
const STOP_MUSIC = 'music/STOP_MUSIC';
const NEXT_MUSIC = 'music/NEXT_MUSIC';
const PREV_MUSIC = 'music/PREV_MUSIC';
const SET_CURRENT_INDEX = 'music/SET_CURRENT_INDEX';
const UPDATE_PLAY_LIST = 'music/UPDATE_PLAY_LIST';

export const loadMusicList = createAction(
  LOAD_MUSIC_LIST,
  (musicList) => musicList,
);
export const playMusic = createAction(PLAY_MUSIC);
export const stopMusic = createAction(STOP_MUSIC);
export const nextMusic = createAction(NEXT_MUSIC);
export const prevMusic = createAction(PREV_MUSIC);
export const setCurrentIndex = createAction(SET_CURRENT_INDEX, (idx) => idx);
export const updatePlayList = createAction(
  UPDATE_PLAY_LIST,
  (newPlayList) => newPlayList,
);

const initialState = {
  playList: null,
  currentMusicId: null,
  currentIndex: 0,
  playing: false,
};

const music = handleActions(
  {
    [LOAD_MUSIC_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.playList = action.payload;
        // if (action.payload.length !== 0) {
        //   draft.playList = action.payload;
        // } else {
        //   draft.playList = [];
        // }
      }),
    [PLAY_MUSIC]: (state, action) =>
      produce(state, (draft) => {
        draft.playing = true;
      }),
    [STOP_MUSIC]: (state, action) =>
      produce(state, (draft) => {
        draft.playing = false;
      }),
    [SET_CURRENT_INDEX]: (state, action) =>
      produce(state, (draft) => {
        draft.currentIndex = action.payload;
        draft.currentMusicId = draft.playList[action.payload].id;
      }),
    [NEXT_MUSIC]: (state, action) =>
      produce(state, (draft) => {
        const nextIndex = (draft.currentIndex + 1) % draft.playList.length;
        draft.currentIndex = nextIndex;
        draft.currentMusicId = draft.playList[nextIndex].id;
      }),
    [PREV_MUSIC]: (state, action) =>
      produce(state, (draft) => {
        const prevIndex =
          (draft.currentIndex - 1 + draft.playList.length) %
          draft.playList.length;
        draft.currentIndex = prevIndex;
        draft.currentMusicId = draft.playList[prevIndex].id;
      }),
    [UPDATE_PLAY_LIST]: (state, action) =>
      produce(state, (draft) => {
        const newPlayList = action.payload;
        draft.playList = newPlayList;
        draft.currentIndex = newPlayList.findIndex(
          (music) => music.id === draft.currentMusicId,
        );
      }),
  },
  initialState,
);

export default music;
