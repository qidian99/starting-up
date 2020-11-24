import { Box, Typography } from "@material-ui/core";
import { tuple } from "antd/lib/_util/type";
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Reveal } from "react-gsap";
import { useHistory } from "react-router-dom";
import { Controller, Scene } from "react-scrollmagic";
import {
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
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
import Frame from "../../components/Frame";
import TTest from "../../components/Graphs/T-Test";
import { FadeInRight } from "../../components/gsap";
import {
  ProjectContainer,
  ProjectText,
  ProjectPlot,
  APP_BAR_HEIGHT_INT,
  PlotContainer,
} from "../../styled";
import { INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "./Visualizer";

const canRender = (arr = []) => {
  let ret = true;
  arr.forEach((v) => {
    if (v <= 0) ret = false;
  });
  return ret;
};
const Introduction = () => {
  const history = useHistory();

  return (
    <PersistentDrawer>
      <Visualizer frames={INTRODUCTION_FRAMES}>
        <ChartController
          ChartComponent={StackedBarChart}
          names={["Projected Totals"]}
          dataKeys={["total"]}
          title={"Projected Global Venture Dollar Volume (in billion $)"}
          data={startupDollarValueData}
        />
        <ChartController
          dataKey={"amount"}
          name={"Global Startup Exits"}
          title={"Volume of Global Startup Exits"}
          data={startupExitData}
          ChartComponent={SingleBarChart}
        />
        <ActionButton
          title={"Next section: Model"}
          onClick={() => history.push("/project/model")}
        />
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Introduction;
