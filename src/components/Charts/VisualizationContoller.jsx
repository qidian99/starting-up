import { Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { APP_BAR_HEIGHT_INT, PlotContainer } from "../../styled";
import { startupDollarValueData } from "./data";
import {
  CHART_DEFAULT_PROPS,
  FADE_OUT_OFFSET,
  FADE_IN_OFFSET,
  TRIGGER_OFFSET,
} from "./default";

const VisualizationController = ({
  children,
  duration,
  trigger,
  limit,
  isLast,
  title,
  ...rest
}) => {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(1);

  return (
    <PlotContainer ref={rootRef} active={active} opacity={opacity}>
      {title && <Typography variant="h6">{title}</Typography>}
      {React.Children.toArray(children).map((child, index) =>
        React.cloneElement(child, {
          active: active,
          ...rest,
        })
      )}
      <Controller>
        <Scene
          duration={duration}
          triggerElement={trigger}
          // indicators
          // triggerHook={0.5}
          triggerHook={
            APP_BAR_HEIGHT_INT / window.innerHeight + TRIGGER_OFFSET 
          }
        >
          {(progress, event) => {
            const ref = rootRef.current;
            const isBefore = event.state === "BEFORE";
            const isDuring = event.state === "DURING";
            const isAfter = event.state === "AFTER";
            const started = progress > 0;
            const finished = progress === 1;
            if (isBefore) {
              setOpacity(0);
            }
            // If animating, display the graph
            if (started) {
              setActive(true);
              if (progress < FADE_IN_OFFSET) {
                setOpacity(progress / FADE_IN_OFFSET);
              } else if (progress > 1 - FADE_OUT_OFFSET) {
                setOpacity((1 - progress) / FADE_OUT_OFFSET);
              } else {
                setOpacity(1);
              }
            }
            // If animation ends, hide the graph
            if ((isAfter && finished) || (isDuring && !started)) {
              setOpacity(0);
              setActive(false);
            }

            return <div />;
          }}
        </Scene>
      </Controller>
    </PlotContainer>
  );
};

export default VisualizationController;

VisualizationController.defaultProps = {
  ...CHART_DEFAULT_PROPS,
  limit: 5,
};
