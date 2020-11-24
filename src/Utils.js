import _ from 'lodash';
import BigNumber from 'bignumber.js';
import { CHART, CHART_AREA, DEFAULT_VALUES } from './Constants';

const {
  MARGIN,
  Y_WIDTH,
} = CHART;

const {
  WIDTH,
  HEIGHT,
  X_RANGE,
  Y_RANGE,
} = CHART_AREA;

// calculate y pixel from x coordinate
export const getY = (
  x, sd, mean,
) => Math.E ** ((x - mean) ** 2 / (-2 * (sd ** 2))) / (Math.sqrt(2 * Math.PI) * sd);

// ticks generator
const generateTicks = (
  start, length, step,
) => Array
  .from({ length }, (v, i) => BigNumber(start).plus(BigNumber(step).times(i)))
  .map((t) => t.toNumber());

// data: data used to draw the graphs
// yTicks: the values on y axis
export const formatData = (params) => {
  const {
    xLow, xHigh, sd, mean, levelLow, levelHigh,
  } = { ...DEFAULT_VALUES, ...params };

  const step = (xHigh - xLow) / 20;
  const data = _.range(xLow, xHigh + step, step).map((x) => {
    const y = getY(x, sd, mean);

    if (x <= levelLow || x >= levelHigh) {
      return ({ x, y, area: y });
    }

    return ({ x, y });
  });

  const yMax = getY(mean, sd, mean);
  // const yStep = yMax < 5 ? (yMax / 5).toPrecision(1) : Math.ceil(yMax / 5);
  const yStep = yMax < 5
    ? BigNumber(yMax).dividedBy(5).toNumber().toPrecision(2)
    : Math.ceil(BigNumber(yMax).dividedBy(5).toNumber());
  const yTicks = generateTicks(0, 6, yStep);

  return {
    data,
    numTicks: (xHigh - xLow) / step,
    yTicks,
    yMax,
  };
};

// converts range of x to pixel (-1, 1) is 2 steps
export const stepToPixel = (step) => (WIDTH / X_RANGE) * step;

// converts x value to pixel
export const xToPixel = (x) => stepToPixel(x + 4) + Y_WIDTH + MARGIN;

// converts x value to y in pixel
export const xToYPixel = (x, sd, mean, yRange) => (getY(x, sd, mean) / yRange) * HEIGHT;
// export const xToYPixel = (x, sd, mean) => (getY(x, sd, mean));

// returns the range of x axis and the numbers on x axis
export const calculateXRange = (mean, sd) => {
  const xLow = BigNumber(mean).minus(BigNumber(sd).times(4)).toNumber();
  const xHigh = BigNumber(mean).plus(BigNumber(sd).times(4)).toNumber();
  const xTicks = generateTicks(xLow, 5, 2 * sd);
  return { xLow, xHigh, xTicks };
};

export const getFrameId = (id) => `frame${id}`;
export const getFrameEndId = (id) => `frame-end${id}`;


export const getOuterHeight = (elm) => {
  var styles = window.getComputedStyle(elm);
  var margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(elm.offsetHeight + margin);
}
