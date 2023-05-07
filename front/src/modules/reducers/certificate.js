/* eslint-disable no-underscore-dangle */
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import {
  LOAD_CERTIFICATE_SUCCESS,
  LOAD_CERTIFICATE_FAILURE,
  ADD_CERTIFICATE_SUCCESS,
  ADD_CERTIFICATE_FAILURE,
  UPDATE_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE_FAILURE,
  DELETE_CERTIFICATE_SUCCESS,
  DELETE_CERTIFICATE_FAILURE,
} from 'modules/sagas/certificate';

const initialState = {
  datas: [],
  loadCertificateError: null,
  addCertificateError: null,
  updateCertificateError: null,
  deleteCertificateError: null,
};

const certificate = handleActions(
  {
    [LOAD_CERTIFICATE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = action.payload;
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
        data.agency = action.payload.agency;
        data.credit = action.payload.credit;
        data.grade = action.payload.grade;
        data.acquireDate = action.payload.acquireDate;
      }),
    [UPDATE_CERTIFICATE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.updateCertificateError = action.payload;
      }),
    [DELETE_CERTIFICATE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.datas = draft.datas.filter(
          (data) => data._id !== action.payload.certificateId,
        );
        draft.deleteCertificateError = null;
      }),
    [DELETE_CERTIFICATE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.deleteCertificateError = action.payload;
      }),
  },
  initialState,
);

export default certificate;
