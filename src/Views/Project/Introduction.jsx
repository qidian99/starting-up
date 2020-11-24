import React from "react";
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
import { INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "./Visualizer";

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
