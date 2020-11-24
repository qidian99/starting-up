/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap';
import { formatData, calculateXRange } from '../../../Utils';
import { CHART } from '../../../Constants';
import './index.css';

const { WIDTH, HEIGHT, MARGIN } = CHART;

class NormalDistribution extends Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.state = {
      mean: 0,
      startSD: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { mean, startSD } = nextProps;
    if (mean !== prevState.mean || startSD !== prevState.startSD) {
      const graph = calculateXRange(mean, startSD);
      nextProps.updateGraphData(graph);
      return { mean, startSD };
    }
    return null;
  }

  getRef = (ref) => {
    this.ref = ref;
  };

  onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: parseFloat(value),
    });
  };

  // updateInputStates = (states) => this.setState({ ...states });
  updateInputStates = () => {}
  
  renderChartAnimation = () => {
    const {
      isLast,
      duration,
      trigger,
      mean,
      startSD,
      endSD,
      updateInputStates = this.updateInputStates,
    } = this.props;

    const changeSD = endSD - startSD;
    const { xLow, xHigh, xTicks } = calculateXRange(mean, startSD);

    let graph = formatData({
      sd: startSD,
      xLow,
      xHigh,
      mean,
    });

    return (
      <Controller>
        <Scene duration={duration} triggerElement={trigger} indicators>
          {(progress, event) => {
            if (event.state === "DURING" && event.type === "enter") {
              updateInputStates({
                startSDDisabled: false,
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

            // calculate new set of data with new startSD as user scrolls
            const newSD = changeSD * progress + startSD;
            graph = formatData({
              sd: newSD,
              xLow,
              xHigh,
              mean,
            });
            // returns the updated graph
            return (
              <LineChart
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
                  tick={{ fontSize: 10, fill: "#cccccc" }}
                  domain={[graph.yTicks[0], graph.yTicks[5]]}
                  ticks={graph.yTicks}
                  interval={0}
                  stroke="#494949"
                />
                <CartesianGrid stroke="rgba(255, 255, 255, 0.06)" />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#cccccc"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            );
          }}
        </Scene>
      </Controller>
    );
  };

  renderChart = () => (
    <div ref={this.getRef}>
      <div
        id="container"
        style={{
          backgroundColor: "#fafafa",
          margin: 40,
          height: HEIGHT,
          width: WIDTH,
          position: "relative",
          marginTop: 60,
        }}
      >
        {this.renderChartAnimation()}
      </div>
    </div>
  );

  render() {
    const { isLast, frameEndTrigger, transitionDuration } = this.props;
    return isLast ? (
      this.renderChart()
    ) : (
      <Controller>
        <Scene
          indicators
          triggerElement={frameEndTrigger}
          duration={transitionDuration}
        >
          {(progress) => (
            <Tween to={{ autoAlpha: 0 }} totalProgress={progress} paused>
              {this.renderChart()}
            </Tween>
          )}
        </Scene>
      </Controller>
    );
  }
}

// const mapStateToProps = ({ graph }) => ({
//   xLow: graph.xLow,
//   xHigh: graph.xHigh,
//   xTicks: graph.xTicks,
// });

const mapDispatchToProps = (dispatch) => ({
  updateGraphData: (graph) => dispatch({
    type: 'UPDATE_GRAPH_DATA',
    graph,
  }),
});

export default compose(
  connect(null, mapDispatchToProps),
)(NormalDistribution);
