import { Link } from "@material-ui/core";
import React, { Component, useCallback, useEffect, useRef } from "react";
import MathJax from "react-mathjax";
import { FrameContainer, FrameText, FrameTitle } from "../../styled";

function getOuterHeight(elm) {
  var styles = window.getComputedStyle(elm);
  var margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(elm.offsetHeight + margin);
}

const Frame = (props) => {
  const {
    frame: { title, body },
    id,
    isLast,
    setHeight,
  } = props;

  const elementRef = useRef(null);

  // useEffect(() => {
  //   function handleResize() {
  //     setHeight(id, getOuterHeight(elementRef.current));
  //   }
  //   window.addEventListener("resize", handleResize);
  // }, [id, setHeight]);

  const renderBody = useCallback(() => {
    return body.map((val, index) => {
      const key = `frame-body${index}`;

      switch (val.type) {
        case "latex":
          return (
            <FrameText key={key}>
              <MathJax.Node formula={val.text} />
            </FrameText>
          );
        case "link":
          return (
            <Link
              key={key}
              href={"#"}
              onClick={() => window.open(val.href)}
              color="primary"
            >
              {val.text}
            </Link>
          );
        case "text":
          return <FrameText key={key}>{val.text}</FrameText>;
        default:
          return <FrameText key={key}>{val.text}</FrameText>;
      }
    });
  }, [body]);

  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      setHeight(id, el.clientHeight);
      new ResizeObserver(() => setHeight(id, el.clientHeight)).observe(el);
    }
  }, [id, setHeight]);

  return (
    <MathJax.Provider>
      <FrameContainer id={`frame${id}`} ref={elementRef}>
        <FrameTitle>{title}</FrameTitle>
        {renderBody()}
      </FrameContainer>
      {!isLast ? (
        <div id={`frame-end${id}`} style={{ border: "1px solid black" }} />
      ) : (
        <div style={{ height: 100 }} />
      )}
    </MathJax.Provider>
  );
};

export default Frame;
