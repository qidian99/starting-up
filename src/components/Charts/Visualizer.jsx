import React, { useCallback, useEffect, useRef, useState } from "react";
import Frame from "../Frame";
import {
  ProjectContainer,
  ProjectText,
  ProjectPlot,
  APP_BAR_HEIGHT_INT,
} from "../../styled";
import { getFrameId } from "../../Utils";

const canRender = (arr = []) => {
  let ret = true;
  arr.forEach((v) => {
    if (v <= 0) ret = false;
  });
  return ret;
};
const Visualizer = ({ frames, children }) => {
  const [heights, setHeights] = useState(Array(frames.length).fill(0));

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

  const frameContainer = useRef(null);

  const setTopPosition = useCallback(() => {
    const container = frameContainer.current;
    if (!container) return;
    const windowHeight = window.innerHeight;
    const containerHeight = container.clientHeight;
    const positionTop = Math.ceil(
      (containerHeight - (windowHeight - APP_BAR_HEIGHT_INT)) / 2
    );
    setTop(positionTop);
  }, []);

  // const frameRefs = useRef(Array(frames.length).fill(createRef()));
  // console.log(frameRefs);

  useEffect(() => {
    const container = frameContainer.current;
    const observer = new ResizeObserver(setTopPosition);
    observer.observe(container);

    return () => observer.disconnect();
  }, [setTopPosition, frameContainer]);

  return (
    <ProjectContainer>
      <ProjectText ref={frameContainer} style={{ top }}>
        {frames.map((frame, index, arr) => (
          <Frame
            key={index.toString()}
            position={index}
            id={getFrameId(index)}
            frame={frame}
            setHeight={setHeight}
            isLast={arr.length - 1 === index}
          />
        ))}
      </ProjectText>
      {canRender(heights) && (
        <ProjectPlot>
          {React.Children.toArray(children).map((child, index) =>
            React.cloneElement(child, {
              duration: heights[0] || 300,
              trigger: "#" + getFrameId(index),
            })
          )}
        </ProjectPlot>
      )}
    </ProjectContainer>
  );
};

export default Visualizer;
