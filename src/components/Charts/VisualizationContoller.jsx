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
  steps,
  ...rest
}) => {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [step, setStep] = useState(0);

  return (
    <PlotContainer
      ref={rootRef}
      active={active ? "true" : "false"}
      opacity={opacity}
      style={{
        display: opacity === 0 ? "none" : "flex",
      }}
    >
      {title && <Typography variant="h6">{title}</Typography>}
      {React.Children.toArray(children).map((child, index) => {
        // console.log({ childStyle: child.props });
        return React.cloneElement(child, {
          active: active ? "true" : "false",
          step: steps !== undefined ? step : undefined,
          ...rest,
        });
      })}
      <Controller>
        <Scene
          duration={duration}
          triggerElement={trigger}
          // indicators
          // triggerHook={0.5}
          triggerHook={APP_BAR_HEIGHT_INT / window.innerHeight + TRIGGER_OFFSET}
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
                if (steps !== undefined) {
                  const partLength =
                    (duration * (1 - FADE_IN_OFFSET - FADE_OUT_OFFSET)) / steps;
                  const newStep = Math.floor(
                    ((progress - FADE_IN_OFFSET) * duration) / partLength
                  );
                  setStep(newStep);
                }
                setOpacity(1);
              }
            } else {
              setActive(false);
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
