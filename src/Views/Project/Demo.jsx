import React, { useEffect } from "react";
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
import { DEMO_FRAMES, INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";

import image1 from "../../assets/register-company.png";
import image2 from "../../assets/strategy-structure.png";
import image3 from "../../assets/baseline-model-region-terrian.png";
import { Info, StarBorder } from "@material-ui/icons";
import ImageGridList from "./ImageGridList";

const tileData = [
  {
    img: image1,
    title: "Register a company",
    author: "Dian Qi",
    cols: 2,
    path: "/company",
  },
  {
    img: image2,
    title: "Choose strategy parameters",
    author: "Dian Qi",
    cols: 2,
    path: "/company",
  },
  {
    img: image3,
    title: "Join simulation",
    author: "Dian Qi",
    cols: 2,
    path: "/simplegame",
  },
];
const Demo = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={DEMO_FRAMES}>
        <ActionButton
          title={"Next section: Evaluation"}
          onClick={() => history.push("/project/evaluation")}
        >
          <ImageGridList data={tileData} />;
        </ActionButton>
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Demo;
