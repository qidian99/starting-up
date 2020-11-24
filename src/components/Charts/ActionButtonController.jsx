import { Box, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, Tween } from "react-gsap";
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
  ProjectContainer,
  ProjectText,
  ProjectPlot,
  APP_BAR_HEIGHT_INT,
  PlotContainer,
  ActionButtonContainer,
} from "../../styled";
import { FadeInRight } from "../gsap";
import { startupDollarValueData, startupExitData } from "./data";
import {
  CHART_DEFAULT_PROPS,
  FADE_OUT_OFFSET,
  FADE_IN_OFFSET,
  TRIGGER_OFFSET,
} from "./default";

const ActionButtonController = ({
  duration,
  trigger,
  ...rest
}) => {
  const rootRef = useRef(null);

  return (
    <ActionButtonContainer ref={rootRef}>
      <Controller>
        <Scene
          duration={duration}
          triggerElement={trigger}
          indicators
          // triggerHook={0.5}
          triggerHook={
            APP_BAR_HEIGHT_INT / window.innerHeight +
            TRIGGER_OFFSET +
            FADE_OUT_OFFSET
          }
        >
          {(progress, event) => {
            return (
              <Reveal repeat trigger={trigger}>
                <FadeInRight>
                  <h3>This headline is coming from left</h3>
                </FadeInRight>
              </Reveal>
            );
          }}
        </Scene>
      </Controller>
    </ActionButtonContainer>
  );
};

export default ActionButtonController;

ActionButtonController.defaultProps = {
};
