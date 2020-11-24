import { Box, Typography } from "@material-ui/core";
import { tuple } from "antd/lib/_util/type";
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Reveal } from "react-gsap";
import { useHistory } from "react-router-dom";
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
import Frame from "../../components/Frame";
import TTest from "../../components/Graphs/T-Test";
import { FadeInRight } from "../../components/gsap";
import {
  ProjectContainer,
  ProjectText,
  ProjectPlot,
  APP_BAR_HEIGHT_INT,
  PlotContainer,
} from "../../styled";
import { INTRODUCTION_FRAMES } from "./frames";

const canRender = (arr = []) => {
  let ret = true;
  arr.forEach((v) => {
    if (v <= 0) ret = false;
  });
  return ret;
};
const Introduction = () => {
  const [heights, setHeights] = useState(
    Array(INTRODUCTION_FRAMES.length).fill(0)
  );

  const history = useHistory();

  const setHeight = useCallback(
    (index, height) => {
      if (!heights[index] || (height && heights[index] !== height)) {
        heights[index] = height;
        setHeights([...heights]);
      }
    },
    [heights]
  );

  const [top, setTop] = useState(0);

  // console.log(heights);

  const textRef = useRef(null);

  const setTopPosition = useCallback(() => {
    const container = textRef.current;
    if (!container) return;
    const windowHeight = window.innerHeight;
    const containerHeight = container.clientHeight;
    const positionTop = Math.ceil(
      (containerHeight - (windowHeight - APP_BAR_HEIGHT_INT)) / 2
    );
    setTop(positionTop);
  }, []);

  // const frameRefs = useRef(Array(INTRODUCTION_FRAMES.length).fill(createRef()));
  // console.log(frameRefs);

  useEffect(() => {
    const container = textRef.current;
    const observer = new ResizeObserver(setTopPosition);
    observer.observe(container);

    return () => observer.disconnect();
  }, [setTopPosition, textRef]);

  return (
    <PersistentDrawer>
      <ProjectContainer>
        <ProjectText ref={textRef} style={{ top }}>
          {INTRODUCTION_FRAMES.map((frame, index, arr) => (
            <Frame
              key={index.toString()}
              id={index}
              // frameRef={frameRefs.current[index]}
              frame={frame}
              setHeight={setHeight}
              isLast={arr.length - 1 === index}
            />
          ))}
        </ProjectText>
        {canRender(heights) && (
          <ProjectPlot>
            <ChartController
              duration={heights[0] || 300}
              ChartComponent={StackedBarChart}
              names={["Projected Totals"]}
              dataKeys={["total"]}
              title={"Projected Global Venture Dollar Volume (in billion $)"}
              data={startupDollarValueData}
              trigger={"#frame0"}
            />
            <ChartController
              duration={heights[1] || 300}
              dataKey={"amount"}
              name={"Global Startup Exits"}
              title={"Volume of Global Startup Exits"}
              data={startupExitData}
              ChartComponent={SingleBarChart}
              trigger={"#frame1"}
            />
            <ActionButton trigger={"#frame2"} title={"Next section: Model"} onClick={() => history.push('/project/model')} />
          </ProjectPlot>
        )}
      </ProjectContainer>
    </PersistentDrawer>
  );
};

export default Introduction;
