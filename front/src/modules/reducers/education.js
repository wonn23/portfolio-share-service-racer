/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import {
  LOAD_EDUCATION_SUCCESS,
  LOAD_EDUCATION_FAILURE,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAILURE,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAILURE,
} from 'modules/sagas/education';

const initialState = {
  datas: [],
  loadEducationError: null,
  addEducationError: null,
  updateEducationError: null,
  deleteEducationError: null,
};

const education = handleActions(
  {
    [LOAD_EDUCATION_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = action.payload;
      }),
    [LOAD_EDUCATION_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadEducationError = action.payload;
      }),
    [ADD_EDUCATION_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas.push(action.payload);
      }),
    [ADD_EDUCATION_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.addEducationError = action.payload;
      }),
    [UPDATE_EDUCATION_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const data = draft.datas.find(
          (value) => value._id === action.payload._id,
        );
        data.school = action.payload.school;
        data.major = action.payload.major;
        data.status = action.payload.status;
      }),
    [UPDATE_EDUCATION_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.updateEducationError = action.payload;
      }),
    [DELETE_EDUCATION_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = draft.datas.filter(
          (data) => data._id !== action.payload.educationId,
        );
        draft.deleteEducationError = null;
      }),
    [DELETE_EDUCATION_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.deleteEducationError = action.payload;
      }),
  },
  initialState,
);

export default education;
