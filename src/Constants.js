export const CHART = {
  WIDTH: 730,
  HEIGHT: 300,
  MARGIN: 6, // top, bottom, left, right margins
  Y_WIDTH: 60, // width of y-axis of the chart (default value)
  X_HEIGHT: 30, // height of x-axis of the chart (default value)
};

export const CHART_AREA = {
  WIDTH: CHART.WIDTH - CHART.MARGIN * 2 - CHART.Y_WIDTH, // height of the chart ignoring the axes
  HEIGHT: CHART.HEIGHT - CHART.MARGIN * 2 - CHART.X_HEIGHT, // width of the chart ignoring the axes
  X_RANGE: 8, // range of x value in graph
  Y_RANGE: 0.5, // range of y value in graph
};

export const ANIMATION = {
  TRANSITION_DURATION: 300, // length of transition between two charts
};

// default values for normal distribution graph
export const DEFAULT_VALUES = {
  xLow: -4,
  xHigh: 4,
  step: 0.5,
  sd: 1,
  mean: 0,
  levelLow: -2,
  levelHigh: 2,
};
