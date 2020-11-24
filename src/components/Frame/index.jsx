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
    return body.map((text, index) => {
      const key = `frame-body${index}`;

      // check extra property
      if (text.tex) {
        return (
          <FrameText key={key}>
            <MathJax.Node formula={text.tex} />
          </FrameText>
        );
      }

      return <FrameText key={key}>{text}</FrameText>;
    });
  }, [body]);

  useEffect(() => {
    if (elementRef.current) {
      // console.log(getOuterHeight(elementRef.current));
      setHeight(id, getOuterHeight(elementRef.current));
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
