import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import {
  LOAD_EDUCATION_SUCCESS,
  LOAD_EDUCATION_FAILURE,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAILURE,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAILURE,
} from 'modules/sagas/education';

const initialState = {
  datas: [],
  loadEducationError: null,
  addEducationError: null,
  updateEducationError: null,
};

const education = handleActions(
  {
    [LOAD_EDUCATION_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        // draft.datas = action.payload.concat(draft.datas);
        draft.datas = draft.datas.concat(action.payload);
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
          (value) => value.id === action.payload.id,
        );
        data.school = action.payload.school;
        data.major = action.payload.major;
        data.status = action.payload.status;
      }),
    [UPDATE_EDUCATION_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.updateEducationError = action.payload;
      }),
  },
  initialState,
);

export default education;
