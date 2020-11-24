// chart height: 370, width: 440
// chart margin: 6 all sides
// x-axis height: 30, y-axis width: 60
// overall height: 412, width: 512

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Area,
} from 'recharts';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import {
  formatData, xToPixel, xToYPixel,
} from '../../../Utils';
import { CHART } from '../../../Constants';

const {
  HEIGHT, WIDTH, MARGIN, X_HEIGHT,
} = CHART;

const LEVEL_LOW = -1.5;
const LEVEL_HIGH = 1.5;
const FAIL_COLOR = 'red';
const PASS_COLOR = '#82ca9d';
const LINE_WIDTH = 1;

class TTest extends Component {
  calculateLineHeight = (x, yMax) => {
    const { sd, mean } = this.props;
    return xToYPixel(x, sd, mean, yMax);
  };

  renderChart = () => {
    const {
      sd, xLow, xHigh, xTicks,
    } = this.props;

    const graph = formatData({
      sd, levelLow: LEVEL_LOW, levelHigh: LEVEL_HIGH, xLow, xHigh,
    });

    return (
      <div
        id="container"
        style={{
          margin: 40,
          // backgroundColor: '#fafafa',
          height: HEIGHT,
          width: WIDTH,
          position: 'relative',
          marginTop: 60,
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <AreaChart
            width={WIDTH}
            height={HEIGHT}
            data={graph.data}
            margin={{
              top: 6, right: 6, bottom: 6, left: 6,
            }}
            style={{ backgroundColor: '#272727' }}
          >
            <defs>
              <linearGradient id="colorUv" gradientTransform="rotate(90)">
                <stop offset="50%" stopColor="#00B9FF" stopOpacity={1} />
                <stop offset="95%" stopColor="#00B9FF" stopOpacity={0.25} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="x"
              type="number"
              domain={[xLow, xHigh]}
              ticks={xTicks}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis
              dataKey="y"
              tick={{ fontSize: 10 }}
              domain={[graph.yTicks[0], graph.yTicks[5]]}
              ticks={graph.yTicks}
              interval={0}
            />
            <Area
              type="monotone"
              dataKey="area"
              fill="url(#colorUv)"
              stroke="#8884d8"
              legendType="circle"
              isAnimationActive={false}
            />
          </AreaChart>
        </div>
        <div style={{
          position: 'absolute', top: 0, left: 0, backgroundColor: 'transparent',
        }}
        >
          <LineChart
            width={WIDTH}
            height={HEIGHT}
            data={graph.data}
            onClick={this.toggleData}
            margin={{
              top: 6, right: 6, bottom: 6, left: 6,
            }}
            style={{ backgroundColor: 'transparent' }}
          >
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.06)"
            />
            <XAxis
              dataKey="x"
              type="number"
              domain={[xLow, xHigh]}
              ticks={xTicks}
              tick={{ fontSize: 12, fill: '#cccccc' }}
              interval={0}
              stroke="#494949"
            />
            <YAxis
              dataKey="y"
              type="number"
              tick={{ fontSize: 10,  }}
              domain={[graph.yTicks[0], graph.yTicks[5]]}
              ticks={graph.yTicks}
              interval={0}
              stroke="#494949"
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#cccccc"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
          {this.renderChartAnimation(graph.yMax)}
        </div>
      </div>
    );
  }

  renderChartAnimation = (yMax) => {
    const { isLast, trigger, duration } = this.props;

    return (
      <Controller>
        <Scene
          duration={duration}
          triggerElement={trigger}
          indicators
        >
          {(progress, event) => {
            // if animating, display the graph
            if (event.state === 'DURING' && this.ref) {
              this.ref.style.display = 'block';
            }
            // if animation ends, hide the graph
            if (!isLast && event.state === 'AFTER' && progress === 1 && this.ref) {
              this.ref.style.display = 'none';
            }
            return this.updateLines(progress, yMax);
          }}
        </Scene>
      </Controller>
    );
  }

  updateLines = (progress, yMax) => {
    const {
      displayLeft = true, displayRight = true, mean, xTicks,
    } = this.props;

    const startCoord = xTicks[1];
    const endCoord = (xTicks[1] + xTicks[2]) / 2;

    const start = {
      leftX: xToPixel(startCoord) - LINE_WIDTH / 2,
      rightX: xToPixel(mean - startCoord + mean) - LINE_WIDTH / 2,
      xCoord: startCoord,
      height: this.calculateLineHeight(startCoord, yMax),
    };

    const end = {
      leftX: xToPixel(endCoord) - LINE_WIDTH / 2,
      rightX: xToPixel(mean - endCoord + mean) - LINE_WIDTH / 2,
      xCoord: endCoord,
      height: this.calculateLineHeight(endCoord, yMax),
    };

    // change in x pixel
    const changeX = end.leftX - start.leftX;
    // change in x coordinate for calculating y pixel
    const changeXCoord = end.xCoord - start.xCoord;
    // current x pixel
    const x = progress * changeX;
    // current x coordinate
    const xCoord = progress * changeXCoord + start.xCoord;
    // calculate y pixel from x coord

    const height = this.calculateLineHeight(xCoord, yMax);

    let animation = {
      leftX: end.leftX,
      rightX: end.rightX,
      height: end.height,
    };
    let lineColor = PASS_COLOR;
    // animation ends: make sure animation ends on end values
    if (start.leftX + x > end.leftX) {
      animation = {
        leftX: end.leftX,
        rightX: end.rightX,
        height: end.height,
      };
    }

    // during animation
    if (start.leftX + x <= end.leftX) {
      animation = {
        leftX: start.leftX + x,
        rightX: start.rightX - x,
        height,
      };
      // toggle color of the lines
      if (xCoord > LEVEL_LOW) {
        lineColor = FAIL_COLOR;
      }
    }

    return (
      <div>
        {displayLeft ? (
          <div
            style={{
              position: 'absolute',
              bottom: X_HEIGHT + MARGIN,
              width: 2,
              height: animation.height,
              left: animation.leftX,
              backgroundColor: lineColor,
            }}
            id="line1"
          />
        ) : null}
        {displayRight ? (
          <div
            style={{
              position: 'absolute',
              bottom: X_HEIGHT + MARGIN,
              width: 2,
              height: animation.height,
              left: animation.rightX,
              backgroundColor: lineColor,
            }}
            id="line2"
          />
        ) : null}
      </div>
    );
  }

  render() {
    const {
      frameEndTrigger, transitionDuration, isLast,
    } = this.props;

    const alpha = isLast ? 1 : 0;
    return (
      isLast ? this.renderChart() : (
        <Controller>
          <Scene
            duration={transitionDuration}
            triggerElement={frameEndTrigger}
            indicators
          >
            {(progress) => (
              <Tween
                to={{ autoAlpha: alpha }}
                totalProgress={progress}
                paused
              >
                {this.renderChart()}
              </Tween>
            )}
          </Scene>
        </Controller>
      )
    );
  }
}

TTest.defaultProps = {
  xLow: -4,
  xHigh: 4,
  xTicks: [],
};
// const mapStateToProps = ({ graph }) => ({
//   xLow: graph.xLow,
//   xHigh: graph.xHigh,
//   xTicks: graph.xTicks,
// });

// export default compose(
//   connect(mapStateToProps),
// )(TTest);

export default TTest;
