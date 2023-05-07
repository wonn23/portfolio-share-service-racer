import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'modules/reducers/loading';

const createSaga = (type, reqAPI) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* ({ payload }) {
    yield put(startLoading(type));

    try {
      const res = yield call(reqAPI, payload);
      yield put({
        type: SUCCESS,
        payload: res.data,
        meta: res,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true,
      });
    }

    yield put(finishLoading(type));
  };
};

export default createSaga;
