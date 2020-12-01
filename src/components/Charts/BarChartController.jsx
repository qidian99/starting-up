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

const ChartController = ({
  children,
  duration,
  trigger,
  limit,
  isLast,
  title,
  ...rest
}) => {
  const { width, height, data, ...other } = rest;
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [offset, setOffset] = useState(0);
  const partLength =
    (duration * (1 - FADE_IN_OFFSET - FADE_OUT_OFFSET)) /
    (data.length - limit > 0 ? data.length - limit + 1 : 1);

  return (
    <PlotContainer ref={rootRef} active={active ? true : undefined} opacity={opacity}>
      {title && <Typography variant="h6">{title}</Typography>}
      {React.Children.toArray(children).map((child, index) =>
        React.cloneElement(child, {
          width: width,
          height: height,
          data: data.slice(0, offset + limit),
          active: active ? "true" : "false",
          ...other,
        })
      )}

      <Controller>
        <Scene
          duration={duration}
          triggerElement={trigger}
          // indicators
          offset={-duration * TRIGGER_OFFSET}
          triggerHook={APP_BAR_HEIGHT_INT / window.innerHeight + 0.01}
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
                const newOffset = Math.floor(
                  ((progress - FADE_IN_OFFSET) * duration) / partLength
                );
                if (newOffset >= 0) {
                  setOffset(newOffset);
                }
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

export default ChartController;

ChartController.defaultProps = {
  ...CHART_DEFAULT_PROPS,
  limit: 5,
};
