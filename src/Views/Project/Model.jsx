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
} from "../../components/Charts/data";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import { INTRODUCTION_FRAMES, MODEL_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";
import VisualizationController from "../../components/Charts/VisualizationContoller";
import ImageGridList from "./ImageGridList";
import image1 from "../../assets/baseline-model-controller.png";
import image3 from "../../assets/baseline-model-companies.png";
import image2 from "../../assets/baseline-model-history.png";
import image4 from "../../assets/baseline-model-funding.png";
import image5 from "../../assets/baseline-model-region-terrian.png";
import image6 from "../../assets/baseline-model-strategy.png";
import image7 from "../../assets/baseline-model-user-revenue.png";
import Terrian from "../../components/game/Terrian";
import { Box, Slider, Typography } from "@material-ui/core";

const tileData = [
  {
    img: image1,
    title: "Controller",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image2,
    title: "Simulation",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image5,
    title: "Terrian and Region",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image3,
    title: "Company",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image4,
    title: "Funding",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image6,
    title: "Strategy",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image7,
    title: "User and Revenue",
    author: "Dian Qi",
    cols: 2,
  },
];

const Model = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={MODEL_FRAMES}>
        <VisualizationController>
          <ImageGridList
            data={tileData}
            titlePosition="bottom"
            width={700}
            containerHeight={600}
          />
        </VisualizationController>
        <VisualizationController>
          <CycleDemo />
        </VisualizationController>
        <VisualizationController>
          <TerrianDemo />
        </VisualizationController>
        <ActionButton
          title={"Next section: Demo"}
          onClick={() => history.push("/project/demo")}
        />
      </Visualizer>
    </PersistentDrawer>
  );
};
const baseCounts = Array(9).fill(0);
const increaseOrder = [4, 5, 2, 1, 0, 3, 6, 7, 8];
const baseRegion = {
  population: 100,
  conversionRate: 0.01,
  leavingRate: 0.0125,
  revenue: 1,
  cost: 10,
  growth: 2,
};

const exampleCycles = 9;

function getCycleValueText(value) {
  return `Cycle ${value}`;
}

const CycleDemo = ({ cycles, cycleValueText }) => {
  const [regions] = useState(Array(9).fill(baseRegion));
  const [counts, setCounts] = useState(baseCounts);
  const [cycle, setCycle] = useState(0);

  const handleCycleChange = useCallback((event, newCycle) => {
    const temp = [...baseCounts];
    increaseOrder.slice(0, newCycle).forEach((i) => (temp[i] = 1));
    setCounts(temp);
    setCycle(newCycle);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography variant="h4">Current Cycle: {cycle}</Typography>
      </Box>
      <Box padding={2}>
        <Terrian width={3} height={3} regions={regions} counts={counts} />
      </Box>
      <Slider
        defaultValue={0}
        onChange={handleCycleChange}
        getAriaValueText={cycleValueText}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={cycles}
      />
    </Box>
  );
};

CycleDemo.defaultProps = {
  cycles: exampleCycles,
  cycleValueText: getCycleValueText,
};

const TerrianDemo = () => {
  const [size, setSize] = useState(3);

  const regions = Array(size * size).fill(baseRegion);
  const counts = Array(size * size).fill(0);

  const handleSizeChange = useCallback((event, newSize) => {
    setSize(newSize);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography variant="h4">Current Size: {size} by {size}</Typography>
      </Box>
      <Box padding={2}>
        <Terrian width={size} height={size} regions={regions} counts={counts} />
      </Box>
      <Slider
        defaultValue={0}
        onChange={handleSizeChange}
        getAriaValueText={(t) => `Size ${t}`}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={2}
        marks
        min={3}
        max={9}
      />
    </Box>
  );
};

TerrianDemo.defaultProps = {
  cycles: exampleCycles,
  cycleValueText: getCycleValueText,
};

export default Model;
