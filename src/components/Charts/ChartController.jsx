import { Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Controller, Scene } from "react-scrollmagic";
import {
  APP_BAR_HEIGHT_INT,
  PlotContainer,
} from "../../styled";
import { startupDollarValueData } from "./data";
import {
  CHART_DEFAULT_PROPS,
  FADE_OUT_OFFSET,
  FADE_IN_OFFSET,
  TRIGGER_OFFSET,
} from "./default";

const ChartController = ({
  ChartComponent,
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
    <PlotContainer ref={rootRef} active={active} opacity={opacity}>
      {title && <Typography variant="h6">{title}</Typography>}
      <ChartComponent
        width={width}
        height={height}
        data={data.slice(0, offset + limit)}
        active={active}
        {...other}
      />
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
            const ref = rootRef.current;
            const isDuring = event.state === "DURING";
            const isAfter = event.state === "AFTER";
            const started = progress > 0;
            const finished = progress === 1;
            // If animating, display the graph
            if (started && ref) {
              if (!active) {
                setActive(true);
              }

              if (progress < FADE_IN_OFFSET) {
                setOpacity(progress / FADE_IN_OFFSET);
              } else if (progress > 1 - FADE_OUT_OFFSET) {
                setOpacity((1 - progress) / FADE_OUT_OFFSET);
              } else {
                if (opacity !== 1) setOpacity(1);
              }

              const newOffset = Math.floor((progress * duration) / partLength);

              // console.log({ newOffset, progress, duration });
              if (newOffset !== offset && newOffset >= 0) {
                setOffset(newOffset);
              }
            }
            // If animation ends, hide the graph
            if (
              // !isLast &&
              ref &&
              ((isAfter && finished) || (isDuring && !started))
            ) {
              setActive(false);
            }

            return <div />;

            // return (<Tween
            //   to={{ autoAlpha: isLast ? 1 : 0 }}
            //   progress={progress}
            //   paused
            // >
            // </Tween>);
          }}
        </Scene>
      </Controller>
    </PlotContainer>
  );
};

export default ChartController;

ChartController.defaultProps = {
  ...CHART_DEFAULT_PROPS,
  data: startupDollarValueData,
  limit: 5,
};
