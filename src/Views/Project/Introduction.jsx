import { Box, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PersistentDrawer from "../../components/DrawerMenu/PersistentDrawer";
import Frame from "../../components/Frame";
import { ProjectContainer, ProjectContext, ProjectPlot } from "../../styled";
import FRAMES from "./frames";

const Introduction = () => {
  const [heights, setHeights] = useState(Array(FRAMES.length).fill(0));

  const setHeight = useCallback(
    (index, height) => {
      if (!heights[index] || (height && heights[index] !== height)) {
        heights[index] = height;
        setHeights([...heights]);
      }
      // console.log({ heights });
    },
    [heights]
  );

  const contextRef = useRef(null);
  const [paddingTop, setPaddingTop] = useState("20vh");
  useEffect(() => {
    setPaddingTop(
      heights.reduce((sum, curr, index) => (index !== 0 ? sum + curr : sum), 0) + 367
    );
  }, [heights]);

  return (
    <PersistentDrawer>
      <ProjectContainer>
        <ProjectContext style={{ paddingTop }}>
          {FRAMES.map((frame, index, arr) => (
            <Frame
              key={index.toString()}
              id={index}
              frame={frame}
              setHeight={setHeight}
              isLast={arr.length - 1 === index}
            />
          ))}
        </ProjectContext>
        <ProjectPlot></ProjectPlot>
      </ProjectContainer>
    </PersistentDrawer>
  );
};

export default Introduction;
