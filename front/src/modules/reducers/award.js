/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import {
  LOAD_AWARD_SUCCESS,
  LOAD_AWARD_FAILURE,
  ADD_AWARD_SUCCESS,
  ADD_AWARD_FAILURE,
  UPDATE_AWARD_SUCCESS,
  UPDATE_AWARD_FAILURE,
  DELETE_AWARD_SUCCESS,
  DELETE_AWARD_FAILURE,
} from 'modules/sagas/award';

const initialState = {
  datas: [],
  loadAwardError: null,
  addAwardError: null,
  updateAwardError: null,
  deleteAwardError: null,
};

const award = handleActions(
  {
    [LOAD_AWARD_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = action.payload;
      }),
    [LOAD_AWARD_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadAwardError = action.payload;
      }),
    [ADD_AWARD_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas.push(action.payload);
      }),
    [ADD_AWARD_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.addAwardError = action.payload;
      }),
    [UPDATE_AWARD_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const data = draft.datas.find(
          (value) => value._id === action.payload._id,
        );
        data.association = action.payload.association;
        data.contest = action.payload.contest;
        data.contest = action.payload.contest;
        data.startDate = action.payload.startDate;
        data.prize = action.payload.prize;
        data.detail = action.payload.detail;
      }),
    [UPDATE_AWARD_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.updateAwardError = action.payload;
      }),
    [DELETE_AWARD_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = draft.datas.filter(
          (data) => data._id !== action.payload.awardId,
        );
        draft.deleteAwardError = null;
      }),
    [DELETE_AWARD_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.deleteAwardError = action.payload;
      }),
  },
  initialState,
);

export default award;
