
const DEFAULT_GAME_STATE = {
  width: -1,
  height: -1,
  users: [],
  name: [],
}
const gameReducer = (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case 'GAME_START': {
      const { name, width, height, users } = action;
      return {
        ...state,
        name, width, height, users,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
