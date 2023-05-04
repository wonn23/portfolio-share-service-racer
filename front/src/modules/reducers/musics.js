import { handleActions } from 'redux-actions';
import { produce } from 'immer';

// prettier-ignore
import {
  LOAD_MUSICS_SUCCESS,
  LOAD_MUSICS_FAILURE,
  ADD_MUSIC_SUCCESS,
  ADD_MUSIC_FAILURE,
  LOAD_COVER_SUCCESS,
  LOAD_COVER_FAILURE
} from 'modules/sagas/music';

const initialState = {
  musics: null,
  cover: null,
  loadMusicListError: null,
  addMusicError: null,
  loadCoverError: null,
  isAdded: false,
};

const musics = handleActions(
  {
    [LOAD_MUSICS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.musics = action.payload;
        draft.loadError = null;
      }),
    [LOAD_MUSICS_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadMusicListError = action.payload;
      }),
    [ADD_MUSIC_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.addMusicError = null;
        draft.isAdded = !draft.isAdded;
      }),
    [ADD_MUSIC_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.addMusicError = action.payload;
        draft.isAdded = false;
      }),
    [LOAD_COVER_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.cover = action.payload.image;
        draft.loadCoverError = null;
      }),
    [LOAD_COVER_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadCoverError = action.payload;
      }),
  },
  initialState,
);

export default musics;
