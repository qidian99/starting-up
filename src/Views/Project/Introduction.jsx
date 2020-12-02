import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ChartController,
  DoublePieChart,
  SingleBarChart,
  StackedBarChart,
} from "../../components/Charts";
import ActionButton from "../../components/Charts/ActionButton";
import {
  startupDollarValueData,
  startupExitData,
} from "../../components/Charts/data";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import { INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";
import VisualizationController from "../../components/Charts/VisualizationContoller";
import GappedPieChart from "../../components/Charts/GappedPieChart";
import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles } from "@material-ui/core";

import image1 from "../../assets/starting-up-history.png";
import image2 from "../../assets/starting-up-region.png";
import image3 from "../../assets/starting-up-company.png";
import image4 from "../../assets/starting-up-region-detail.png";

import image5 from "../../assets/algorithm.png";
import image6 from "../../assets/multimedia.png";
import image7 from "../../assets/m0_num_bankrupt.png";
import image8 from "../../assets/business.png";
import { Info, StarBorder } from "@material-ui/icons";
import ImageGridList from "./ImageGridList";

const myObjectiveData = [
  {
    img: image1,
    title: "Interactive User Interface",
    author: "Dian Qi",
    cols: 2,
  },
  {
    img: image2,
    title: "Region Schema",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image3,
    title: "Company Schema",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image4,
    title: "Region User Interface",
    author: "Dian Qi",
    cols: 2,
  },
];


const outlineData = [
  {
    img: image5,
    title: "Model",
    path: "model",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image6,
    title: "Demo",
    path: "demo",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image7,
    title: "Evaluation",
    path: "evaluation",
    author: "Dian Qi",
    cols: 1,
  },
  {
    img: image8,
    title: "Conclusion",
    path: "conclusion",
    author: "Dian Qi",
    cols: 1,
  },
];





const Introduction = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={INTRODUCTION_FRAMES} endPadding={200}>
        <ChartController
          names={["Projected Totals"]}
          dataKeys={["total"]}
          title={"Projected Global Venture Dollar Volume (in billion $)"}
          data={startupDollarValueData}
        >
          <StackedBarChart />
        </ChartController>
        <ChartController
          dataKey={"amount"}
          name={"Global Startup Exits"}
          title={"Volume of Global Startup Exits (in million $)"}
          data={startupExitData}
        >
          <SingleBarChart />
        </ChartController>
        <VisualizationController>
          <DoublePieChart />
        </VisualizationController>
        <VisualizationController>
          <GappedPieChart />
        </VisualizationController>
        <VisualizationController>
          <ImageGridList data={myObjectiveData} />
        </VisualizationController>
        <ActionButton
          title={"Next section: Model"}
          onClick={() => history.push("/project/model")}
        >
          <ImageGridList
            background={false}
            titlePosition="bottom"
            data={outlineData}
          />
        </ActionButton>
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Introduction;

