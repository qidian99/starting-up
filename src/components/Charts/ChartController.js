import { Box, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "../../styled";
import { startupDollarValueData, startupExitData } from "./data";
import { CHART_DEFAULT_PROPS } from "./default";

const ChartController = ({ ChartComponent, duration, trigger, limit, isLast, title, ...rest }) => {
  const { width, height, data, ...other } = rest;
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const [partLength] = useState(
    duration / (data.length - limit > 0 ? data.length - limit + 1 : 1)
  );

  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    setRendered(true);
  }, [])


  // console.log({ data: data.slice(0, offset + limit)})

  return (
    <PlotContainer ref={rootRef} active={active}>
      {title && <Typography variant="h6">{title}</Typography>}
      <ChartComponent width={width} height={height} data={data.slice(0, offset + limit)} active={active} {...other} />
      <Controller>
        <Scene
          duration={duration}
          triggerElement={trigger}
          indicators
          triggerHook={APP_BAR_HEIGHT_INT / window.innerHeight}
        >
          {(progress, event) => {
            if (!rendered) return <div />;
            // console.log({ progress, event });
            const ref = rootRef.current;
            const isDuring = event.state === "DURING";
            const isAfter = event.state === "AFTER";
            const started = progress > 0;
            const finished = progress === 1;
            // If animating, display the graph
            if (started && ref) {
              setActive(true);

              const newOffset = Math.floor((progress * duration) / partLength);

              // console.log({ newOffset, progress, duration });
              if (newOffset !== offset) {
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

