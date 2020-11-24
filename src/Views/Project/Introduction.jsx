import { Box, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import Frame from "../../components/Frame";
import {
  ProjectContainer,
  ProjectText,
  ProjectPlot,
  APP_BAR_HEIGHT_INT,
} from "../../styled";
import FRAMES from "./frames";

const Introduction = () => {
  const [heights, setHeights] = useState(Array(FRAMES.length).fill(0));

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

  const textRef = useRef(null);

  const setTopPosition = useCallback(
    () => {
      const container = textRef.current;
      if (!container) return;
      const windowHeight = window.innerHeight;
      const containerHeight = container.clientHeight;
      const positionTop = Math.ceil(
        (containerHeight - (windowHeight - APP_BAR_HEIGHT_INT)) / 2
      );
      setTop(positionTop);
    },
    []
  );

  useEffect(() => {
    const container = textRef.current;
    new ResizeObserver(setTopPosition).observe(container);
  }, [setTopPosition, textRef]);

  return (
    <PersistentDrawer>
      <ProjectContainer>
        <ProjectText ref={textRef} style={{ top }}>
          {FRAMES.map((frame, index, arr) => (
            <Frame
              key={index.toString()}
              id={index}
              frame={frame}
              setHeight={setHeight}
              isLast={arr.length - 1 === index}
            />
          ))}
        </ProjectText>
        <ProjectPlot></ProjectPlot>
      </ProjectContainer>
    </PersistentDrawer>
  );
};

export default Introduction;
