import { GAME_ACTIONS } from "../util/game";

const DEFAULT_GAME_STATE = {
  newGame: false,
  game: null,
}
const gameReducer = (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case GAME_ACTIONS.ENTER_GAME: {
      const { game } = action;
      return {
        ...state,
        newGame: false,
        game,
      }
    }
    case GAME_ACTIONS.SET_NEW_GAME: {
      const { value } = action;
      return {
        ...state,
        newGame: value,
      }
    }
    default:
      return state;
  }
};

export default gameReducer;
