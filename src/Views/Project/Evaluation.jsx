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
import { EVALUATION_FRAMES, INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";

const Evaluation = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={EVALUATION_FRAMES}>
        <ActionButton
          title={"Next section: Conclusion"}
          onClick={() => history.push("/project/conclusion")}
        />
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Evaluation;
