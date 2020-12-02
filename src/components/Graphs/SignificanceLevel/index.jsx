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
import classnames from 'classnames';
import {
  formatData, xToPixel,
} from '../../../Utils';

import './index.css';

import { CHART, CHART_AREA } from '../../../Constants';

const {
  HEIGHT, WIDTH, MARGIN,
} = CHART;

const zValue = {
  0.1: 1.28,
  0.05: 1.645,
  0.01: 2.33,
};

// calculates the tail x value from specified z value
const zToXPixel = (mean, sd, z) => xToPixel(mean + z * sd);

class SignificanceLevel extends Component {
  constructor(props) {
    super(props);
    const { xLow, xHigh } = props;

    this.state = {
      animationStart: {
        left: xToPixel(xLow),
        width: xToPixel(xHigh) - xToPixel(xLow),
      },
      // change between animation start and animation end
      animationEnd: {
        left: 0,
        width: 0,
      },
      mean: 0,
      endSD: 0,
      sigLevel: 0,
    };
    this.ref = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { mean, endSD, sigLevel } = nextProps;
    if (
      mean !== prevState.mean ||
      endSD !== prevState.endSD ||
      sigLevel !== prevState.sigLevel
    ) {
      const z = zValue[sigLevel];
      const animationEnd = {
        left: zToXPixel(mean, endSD, -z),
        width: zToXPixel(mean, endSD, z) - zToXPixel(mean, endSD, -z),
      };
      return { mean, endSD, animationEnd };
    }

    return null;
  }

  getRef = (ref) => {
    this.ref = ref;
  };

  // updateInputStates = (states) => this.setState({ ...states });
  updateInputStates = () => {};

  // render the animated block in the middle
  renderChartAnimation = () => {
    const {
      isLast,
      trigger,
      duration,
      updateInputStates = this.updateInputStates,
    } = this.props;

    const { animationEnd, animationStart } = this.state;

    return (
      <Controller>
        <Scene duration={duration} triggerElement={trigger} indicators>
          {(progress, event) => {
            if (event.state === "DURING" && event.type === "enter") {
              updateInputStates({
                startSDDisabled: true,
                endSDDisabled: false,
                meanDisabled: false,
                sigDisabled: false,
              });
            }
            // if animating, display the graph
            if (event.state === "DURING" && this.ref) {
              this.ref.style.display = "block";
            }
            // if animation ends, hide the graph
            if (
              !isLast &&
              event.state === "AFTER" &&
              progress === 1 &&
              this.ref
            ) {
              this.ref.style.display = "none";
            }

            const animationEnded = event.state === "AFTER" && progress === 1;

            // console.log(animationStart, animationEnd);

            // if width exceeds the width of the graph, set it to the graph to prevet overflow
            const widthChange =
              animationEnd.width > CHART_AREA.WIDTH
                ? CHART_AREA.WIDTH
                : animationEnd.width;
            // if the x value of the interval is not within the domain of the graph, don't bother
            const xChange = animationEnd.left - animationStart.left;

            return (
              <Tween
                to={{
                  x: xChange > 0 ? xChange : 0,
                  y: 0,
                  height: HEIGHT,
                  width: widthChange,
                }}
                totalProgress={progress}
                paused
              >
                <div
                  // className={classnames(animationEnded ? 'after-animation' : '')}
                  style={{
                    position: "absolute",
                    top: 0,
                    transform: animationEnded ? "translate(0, 0)" : "",
                    left: animationEnded
                      ? animationEnd.left
                      : animationStart.left,
                    width: animationEnded
                      ? animationEnd.width
                      : animationStart.width,
                    height: HEIGHT,
                    backgroundColor: "#272727",
                  }}
                  id="animated-block"
                />
              </Tween>
            );
          }}
        </Scene>
      </Controller>
    );
  };

  renderChart = () => {
    const { sd, mean, xLow, xHigh, xTicks } = this.props;
    const graph = formatData({
      sd,
      xLow,
      xHigh,
      mean,
    });

    return (
      <div
        id="container"
        style={{
          // backgroundColor: '#272727',
          margin: 40,
          height: HEIGHT,
          width: WIDTH,
          position: "relative",
          marginTop: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <AreaChart
            width={WIDTH}
            height={HEIGHT}
            data={graph.data}
            margin={{
              top: MARGIN,
              right: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
            }}
            style={{ backgroundColor: "#272727" }}
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
              dataKey="y"
              fill="url(#colorUv)"
              stroke="#8884d8"
              isAnimationActive={false}
            />
          </AreaChart>
        </div>
        {this.renderChartAnimation()}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "transparent",
          }}
        >
          <LineChart
            width={WIDTH}
            height={HEIGHT}
            data={graph.data}
            margin={{
              top: 6,
              right: 6,
              bottom: 6,
              left: 6,
            }}
            style={{ backgroundColor: "transparent" }}
          >
            <CartesianGrid stroke="rgba(255, 255, 255, 0.06)" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[xLow, xHigh]}
              ticks={xTicks}
              tick={{ fontSize: 12, fill: "#cccccc" }}
              interval={0}
              stroke="#494949"
            />
            <YAxis
              dataKey="y"
              type="number"
              tick={{ fontSize: 10, fill: "#cccccc" }}
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
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      </div>
    );
  };

  render() {
    const { frameEndTrigger, transitionDuration, isLast } = this.props;
    const alpha = isLast ? 1 : 0;

    return isLast ? (
      this.renderChart()
    ) : (
      <Controller>
        <Scene
          duration={transitionDuration}
          triggerElement={frameEndTrigger}
          indicators
        >
          {(progress) => (
            <Tween to={{ autoAlpha: alpha }} totalProgress={progress} paused>
              {this.renderChart()}
            </Tween>
          )}
        </Scene>
      </Controller>
    );
  }
}

const mapStateToProps = ({ graph }) => ({
  xLow: graph.xLow,
  xHigh: graph.xHigh,
  xTicks: graph.xTicks,
});

// const mapDispatchToProps = (dispatch) => ({
//   updateInputStates: (inputStates) => dispatch({
//     type: 'UPDATE_INPUT_STATES',
//     inputStates,
//   }),
// });

export default compose(
  connect(mapStateToProps),
)(SignificanceLevel);

// export default SignificanceLevel;
