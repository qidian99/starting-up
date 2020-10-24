import { GAME_ACTIONS } from "../util/game";

const DEFAULT_GAME_STATE = {
  newGame: false,
  width: -1,
  height: -1,
  numPlayers: -1,
  started: false,
  users: [],
  name: [],
}
const gameReducer = (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case GAME_ACTIONS.REGISTER_GAME: {
      const { name, width, height, users } = action;
      return {
        ...state,
        name, width, height, users,
      };
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
