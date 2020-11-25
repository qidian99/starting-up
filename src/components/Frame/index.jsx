import { Link } from "@material-ui/core";
import React, { Component, useCallback, useEffect, useRef } from "react";
import MathJax from "react-mathjax";
import { FrameContainer, FrameList, FrameText, FrameTitle } from "../../styled";
import { getFrameEndId } from "../../Utils";

const getTextFrame = (item, index, inline = false) => {
  const key = `frame-body${index}`;
  let body;
  switch (item.type) {
    case "tex":
      body = <MathJax.Node inline={inline} formula={item.value} />;
      break;
    case "link":
      body = (
        <Link
          key={key}
          href={item.href}
          onClick={(event) => {
            event.preventDefault();
            window.open(item.href);
          }}
          color="primary"
        >
          {item.value}
        </Link>
      );
      break;

    case "list":
      body = (
        <FrameList>
          {item.value.map((t, i) => (
            <li key={`li-${index}-${i}`}>{t}</li>
          ))}
        </FrameList>
      );
      break;
    case "text":
      body = (
        <>{item.value.map((subItem, i) => getTextFrame(subItem, i, true))}</>
      );
      break;
    default:
      body = item;
  }
  return <FrameText inline={inline} key={key}>{body}</FrameText>;
};

const Frame = (props) => {
  const {
    frame: { title, body },
    position,
    id,
    isLast,
    setHeight,
  } = props;

  const frameRef = useRef(null);

  const renderBody = useCallback(() => {
    return body.map((item, index) => getTextFrame(item, index));
  }, [body]);

  useEffect(() => {
    const el = frameRef.current;
    if (el) {
      setHeight(position, el.clientHeight);
      const observer = new ResizeObserver(() =>
        setHeight(position, el.clientHeight)
      );
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [frameRef, position, setHeight]);

  return (
    <MathJax.Provider>
      <FrameContainer id={id} ref={frameRef}>
        <FrameTitle>{title}</FrameTitle>
        {renderBody()}
      </FrameContainer>
      {!isLast ? (
        <div
          id={getFrameEndId(position)}
          //  style={{ border: "1px solid black" }}
        />
      ) : (
        <div style={{ height: 250 }} />
      )}
    </MathJax.Provider>
  );
};

export default Frame;
