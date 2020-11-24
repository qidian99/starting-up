const DEFAULT_GRAPH_STATE = {
  xLow: -4,
  xHigh: 4,
  xTicks: [],
  startSDState: true,
  enddSDState: true,
  meanState: true,
};

const graphReducer = (state = DEFAULT_GRAPH_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_GRAPH_DATA': {
      const { graph } = action;
      return { ...state, ...graph };
    }
    case 'UPDATE_INPUT_STATES': {
      const { inputStates } = action;
      return { ...state, ...inputStates };
    }
    default:
      return state;
  }
};


export default graphReducer;
