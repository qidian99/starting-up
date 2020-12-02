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
import { CONCLUSION_FRAMES, INTRODUCTION_FRAMES } from "./frames";
import Visualizer from "../../components/Charts/Visualizer";
import conclusionImage from "../../assets/business.png";
import variantImage from "../../assets/variant.png";
import gameImage from "../../assets/generalio.png";
import VisualizationController from "../../components/Charts/VisualizationContoller";
import { Box, Typography } from "@material-ui/core";

const Conclusion = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PersistentDrawer>
      <Visualizer frames={CONCLUSION_FRAMES}>
        <VisualizationController>
          <img src={conclusionImage} width={400} alt="Conclusion" />
        </VisualizationController>
        <VisualizationController>
          <img src={variantImage} width={400} alt="Variant" />
        </VisualizationController>
        <ActionButton
          title={"Go to dashboard"}
          onClick={() => history.push("/")}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={gameImage} width={600} alt="An example of IO game" />
            <Typography variant="h6">An example of IO game</Typography>
          </Box>
        </ActionButton>
      </Visualizer>
    </PersistentDrawer>
  );
};

export default Conclusion;
