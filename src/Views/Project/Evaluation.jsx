import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ChartController,
  SingleBarChart,
  StackedBarChart,
} from "../../components/Charts";
import ActionButton from "../../components/Charts/ActionButton";
import {
  startupDollarValueData,
  startupExitData,
  numBankruptData,
  avgRevenueData1,
  avgRevenueData2,
} from "../../components/Charts/data";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import { EVALUATION_FRAMES, INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";
import evalImage from "../../assets/checklist.png";
import image1 from "../../assets/m0_num_bankrupt.png";
import image2 from "../../assets/m0_total_revenue_w_bankrupt.png";
import image3 from "../../assets/m0_total_revenue_wo_bankrupt.png";

import simulationImage from "../../assets/simulation.png";
import VisualizationController from "../../components/Charts/VisualizationContoller";
import {
  generateGraphData,
  baselineUserGrowthFn,
  getCycleValueText,
} from "../../Utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  ReferenceLine,
  ComposedChart,
  Area,
} from "recharts";
import ImageGridList from "./ImageGridList";
import { Box, Slider, Typography } from "@material-ui/core";
import Terrian from "../../components/game/Terrian";

const tileData = [
  {
    img: image1,
    // title: "Register a company",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image2,
    // title: "Choose strategy parameters",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image3,
    // title: "Join simulation",
    author: "Dian Qi",
    cols: 1,
  },
];

const Evaluation = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={EVALUATION_FRAMES} firstOffset={0.2}>
        <VisualizationController>
          {/* <ImageGridList data={tileData} /> */}
          <img
            width={300}
            src={evalImage}
            alt="Evaluation"
            style={{ marginTop: 12 }}
          />
        </VisualizationController>
        <VisualizationController steps={xVals.length}>
          <FixedPointIterationChart />
        </VisualizationController>
        <VisualizationController steps={5} name="Test Name">
          <TerrianDemo />
        </VisualizationController>
        <VisualizationController>
          <img
            width={300}
            src={simulationImage}
            alt="Simulation"
            style={{ marginTop: 12 }}
          />
        </VisualizationController>
        <ChartController
          dataKey={"value"}
          name={"Number of Bankruptcy"}
          title={"Number of Bankruptcy by m0"}
          data={numBankruptData}
          limit={1}
        >
          <SingleBarChart />
        </ChartController>

        <ChartController
          dataKey={"value"}
          name={"Average Revenue"}
          title={"Average revenue by m0 excluding bankrupted cases"}
          data={avgRevenueData1}
          limit={1}
        >
          <SingleBarChart />
        </ChartController>
        <ActionButton
          title={"Next section: Conclusion"}
          onClick={() => history.push("/project/conclusion")}
        >
          <ChartController
            dataKey={"value"}
            name={"Average Revenue"}
            title={"Average revenue by m0 including bankrupted cases"}
            data={avgRevenueData2}
            limit={1}
          >
            <SingleBarChart />
          </ChartController>
        </ActionButton>
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Evaluation;

const xVals = [
  10,
  12,
  15,
  18,
  21,
  24,
  27,
  30,
  33,
  36,
  39,
  42,
  45,
  48,
  51,
  54,
  57,
  60,
  63,
  65,
  67,
  69,
  71,
  73,
  75,
  77,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  93,
  93,
];

const FixedPointIterationChart = ({ step, cycleValueText }) => {
  const [x, setX] = useState(xVals[step]);
  const [y, setY] = useState(baselineUserGrowthFn(x));
  const [cycle, setCycle] = useState(step);
  const [data] = useState(generateGraphData(baselineUserGrowthFn, 0, 100, 0.2));

  const getVal = useCallback(
    (val) => {
      if (val.x > x || val.x < 10) return 0;
      else return val.y;
    },
    [x]
  );

  const updateStep = useCallback((step) => {
    setX(xVals[step]);
    setY(baselineUserGrowthFn(xVals[step]));
    setCycle(step);
  }, []);

  const handleChange = useCallback(
    (event, newStep) => {
      updateStep(newStep);
    },
    [updateStep]
  );

  useEffect(() => {
    updateStep(step);
  }, [step, updateStep]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ComposedChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) =>
            v.toFixed(2)
          )}
          dataKey="x"
          interval="preserveStart"
        />
        <YAxis dataKey="y" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dot={false}
          dataKey="y"
          name="Expected net user growth"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <ReferenceDot
          x={x.toFixed(2)}
          y={y}
          r={3}
          fill="#9c27b0"
          stroke="none"
        />
        <ReferenceLine
          x={x.toFixed(2)}
          stroke="green"
          label={`Cycle ${cycle}`}
        />
        <Area dataKey={getVal} baseLine={[{ x: 12, y: 15 }]} name={"Area"} />
      </ComposedChart>
      <Slider
        defaultValue={0}
        onChange={handleChange}
        getAriaValueText={cycleValueText}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        value={cycle}
        min={0}
        max={xVals.length - 1}
      />
    </Box>
  );
};

FixedPointIterationChart.defaultProps = {
  step: 0,
  cycleValueText: getCycleValueText,
};

const baseRegion = {
  population: 100,
  conversionRate: 0.01,
  leavingRate: 0.0125,
  revenue: 1,
  cost: 10,
  growth: 2,
};

const getCounts = (step, size = 9) => {
  // console.log({ step });
  return Array(size * size)
    .fill(0)
    .map((val, index) => {
      const x = index % 9;
      const y = Math.floor(index / 9);
      const margin = Math.floor((size + 1) / 2);
      if (x < margin && y < margin) {
        if (x + y >= 2 * margin - step - 2) return 1;
      } else if (x >= margin && y >= margin) {
        if (x + y <= 2 * margin + step - 2) return 1;
      } else {
        if (Math.abs(x - y) <= step) return 1;
      }

      return 0;
    });
};

const TerrianDemo = ({ step: stepProp }) => {
  const [size] = useState(9);

  const [regions] = useState(Array(size * size).fill(baseRegion));
  const [counts, setCounts] = useState(Array(size * size).fill(0));
  const [step, setStep] = useState(stepProp);
  const changeState = useCallback((step) => {
    setCounts(getCounts(step));
    setStep(step);
  }, []);
  const handleSizeChange = useCallback(
    (event, newStep) => {
      changeState(newStep);
    },
    [changeState]
  );

  useEffect(() => {
    changeState(stepProp);
  }, [changeState, stepProp]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box padding={2}>
        <Terrian width={size} height={size} regions={regions} counts={counts} />
      </Box>
      <Slider
        defaultValue={0}
        onChange={handleSizeChange}
        getAriaValueText={(t) => `Size ${t}`}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        value={step}
        min={0}
        max={4}
      />
    </Box>
  );
};

TerrianDemo.defaultProps = {
  step: 0,
  cycles: [0, 1, 2, 3, 4],
  cycleValueText: getCycleValueText,
};
