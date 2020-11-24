import { Box, Button, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlayState, Reveal, Tween } from "react-gsap";
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

const ActionButton = ({ duration, trigger, title, onClick }) => {
  return (
    <Controller>
      <Scene
        duration={duration}
        triggerElement={trigger}
        // indicators
        // triggerHook={0.5}
        triggerHook={
          APP_BAR_HEIGHT_INT / window.innerHeight +
          TRIGGER_OFFSET +
          FADE_OUT_OFFSET
        }
      >
        {(progress, event) => {
          if (progress === 0) return <div />;
          return (
            <ActionButtonContainer>
              <Tween
                from={{ opacity: 0, transform: "translate3d(100vw, 0, 0)" }}
                ease="back.out(1.2)"
                // {...(progress === 0 ? { progress: 0 } : {})}
                playState={progress > 0 ? PlayState.play : PlayState.pause}
              >
                <Button onClick={onClick} variant="contained" color="primary">
                  {title || "Next Section"}
                </Button>
              </Tween>
            </ActionButtonContainer>
          );
        }}
      </Scene>
    </Controller>
  );
};

export default ActionButton;

ActionButton.defaultProps = {
  duration: 0,
  onClick: () => {},
};
