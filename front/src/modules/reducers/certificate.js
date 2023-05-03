import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import {
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
  ADD_CERTIFICATE_SUCCESS,
  ADD_CERTIFICATE_FAILURE,
  UPDATE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAILURE,
} from 'modules/sagas/certificate';

const initialState = {
  datas: [],
  loadCertificateError: null,
  addCertificateError: null,
  updateCertificateError: null,
};

const certificate = handleActions(
  {
    [LOAD_CERTIFICATE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = draft.datas.concat(action.payload);
      }),
    [LOAD_CERTIFICATE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.loadCertificateError = action.payload;
      }),
    [ADD_CERTIFICATE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas.push(action.payload);
      }),
    [ADD_CERTIFICATE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.addCertificateError = action.payload;
      }),
    [UPDATE_CERTIFICATE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const data = draft.datas.find(
          (value) => value.id === action.payload.id,
        );
        data.certificateName = action.payload.certificateName;
        data.issueAgency = action.payload.issueAgency;
        data.grade = action.payload.grade;
        data.acquisitionDate = action.payload.acquisitionDate;
      }),
    [UPDATE_CERTIFICATE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.updateCertificateError = action.payload;
      }),
  },
  initialState,
);

export default certificate;
