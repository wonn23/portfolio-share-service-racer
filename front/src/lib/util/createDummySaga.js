/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import { delay, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'modules/reducers/loading';
import shortid from 'shortid';

const createDummySaga = (type, reqAPI = null, isRunable = false) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* ({ payload }) {
    yield put(startLoading(type));

    try {
      // const res = yield call(reqAPI, payload);

      yield delay(1000);

      if (isRunable === 'LOAD') {
        const data = reqAPI(0, payload);
        yield put({
          type: SUCCESS,
          payload: data,
        });
      } else if (isRunable === 'ADD') {
        const id = shortid.generate();
        yield put({
          type: SUCCESS,
          payload: {
            ...payload,
            id,
          },
        });
      } else {
        yield put({
          type: SUCCESS,
          payload,
        });
      }
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

export default createDummySaga;
