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
    // frameRef,
  } = props;

  const frameRef = useRef(null);

  // useEffect(() => {
  //   function handleResize() {
  //     setHeight(id, getOuterHeight(elementRef.current));
  //   }
  //   window.addEventListener("resize", handleResize);
  // }, [id, setHeight]);

  const renderBody = useCallback(() => {
    return body.map((val, index) => {
      const key = `frame-body${index}`;
      let body;
      switch (val.type) {
        case "tex":
          body = <MathJax.Node formula={val.text} />;
          break;
        case "link":
          body = (
            <Link
              key={key}
              href={val.href}
              onClick={(event) => {
                event.preventDefault();
                window.open(val.href);
              }}
              color="primary"
            >
              {val.text}
            </Link>
          );
          break;
        case "text":
          body = <FrameText key={key}>{val.text}</FrameText>;
          break;
        default:
          body = <FrameText key={key}>{val}</FrameText>;
      }
      return <FrameText key={key}>{body}</FrameText>;
    });
  }, [body]);

  useEffect(() => {
    const el = frameRef.current;
    if (el) {
      setHeight(id, el.clientHeight);
      const observer = new ResizeObserver(() => setHeight(id, el.clientHeight));
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [frameRef, id, setHeight]);

  return (
    <MathJax.Provider>
      <FrameContainer id={`frame${id}`} ref={frameRef}>
        <FrameTitle>{title}</FrameTitle>
        {renderBody()}
      </FrameContainer>
      {!isLast ? (
        <div
          id={`frame-end${id}`}
          //  style={{ border: "1px solid black" }}
        />
      ) : (
        <div style={{ height: 100 }} />
      )}
    </MathJax.Provider>
  );
};

export default Frame;
