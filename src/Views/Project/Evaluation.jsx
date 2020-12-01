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
  numBankruptData,
  avgRevenueData1,
  avgRevenueData2,
} from "../../components/Charts/data";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import { EVALUATION_FRAMES, INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";
import evalImage from "../../assets/m0_num_bankrupt.png";
import VisualizationController from "../../components/Charts/VisualizationContoller";

const Evaluation = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={EVALUATION_FRAMES}>
        <VisualizationController>
          <img
            width={600}
            src={evalImage}
            alt="Funding Schema"
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
          name={"Averge Revenue"}
          title={"Averge revenue by m0 excluding bankrupted cases"}
          data={avgRevenueData1}
          limit={1}
        >
          <SingleBarChart />
        </ChartController>
        <ChartController
          dataKey={"value"}
          name={"Averge Revenue"}
          title={"Averge revenue by m0 including bankrupted cases"}
          data={avgRevenueData2}
          limit={1}
        >
          <SingleBarChart />
        </ChartController>
        <ActionButton
          title={"Next section: Conclusion"}
          onClick={() => history.push("/project/conclusion")}
        />
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Evaluation;
