import { ERROR_ACTIONS } from '../util';
import { GAME_ACTIONS } from '../util/game';

const DEFAULT_AUTH_STATE = {
  error: null
}

const errorReducer = (state = DEFAULT_AUTH_STATE, action) => {
  switch (action.type) {
    case ERROR_ACTIONS.NEW_ERROR:
      const { error } = action;
      return { ...state, error };

    case GAME_ACTIONS.REGISTER_GAME:
    case GAME_ACTIONS.ENTER_GAME:
    case ERROR_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null }
    default:
      return state;
  }
};

export default errorReducer;
