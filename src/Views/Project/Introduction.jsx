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
import { Info, StarBorder } from "@material-ui/icons";
import ImageGridList from "./ImageGridList";

const tileData = [
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


const Introduction = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={INTRODUCTION_FRAMES}>
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
          title={"Volume of Global Startup Exits"}
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
          <ImageGridList data={tileData} />
        </VisualizationController>
        <ActionButton
          title={"Next section: Model"}
          onClick={() => history.push("/project/model")}
        />
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Introduction;

