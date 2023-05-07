import { createAction, handleActions } from 'redux-actions';

// prettier-ignore
import { 
  GET_USER_SUCCESS,
  GET_USER_FAILURE ,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from 'modules/sagas/user';

const initialState = {
  user: null,
  error: null,
};

const INITIALIZE = 'profile/INITIALIZE';
const INITWITHTOKENPROFILE = 'profile/INITWITHTOKENPROFILE';

export const initProfile = createAction(INITIALIZE);
export const initWithTokenProfile = createAction(
  INITWITHTOKENPROFILE,
  (user) => user,
);

const profile = handleActions(
  {
    [GET_USER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [GET_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UPDATE_USER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
    [UPDATE_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INITIALIZE]: () => initialState,
    [INITWITHTOKENPROFILE]: (state, { payload: user }) => ({
      ...state,
      user,
      error: null,
    }),
  },
  initialState,
);

export default profile;
