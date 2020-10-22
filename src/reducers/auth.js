import { AUTH_ACTIONS } from '../util';

const DEFAULT_AUTH_STATE = {
  jwt: null,
  user: null
}

const authReducer = (state = DEFAULT_AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGNUP:
    case AUTH_ACTIONS.LOGIN:
      const { user, jwt } = action;
      return { ...state, user, jwt };
    case AUTH_ACTIONS.LOGOUT:
      return DEFAULT_AUTH_STATE;
    default:
      return state;
  }
};

export default authReducer;
