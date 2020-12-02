const { default: styled } = require("styled-components");

export const APP_BAR_HEIGHT_INT = 64;
export const APP_BAR_HEIGHT = APP_BAR_HEIGHT_INT + "px";
export const FRAME_FONT_SIZE = 16;
/* Components */
export const ProjectContainer = styled.div`
  margin-top: ${APP_BAR_HEIGHT};
  display: grid;
  grid-template-columns: 40vw auto;
`;

export const ProjectText = styled.div`
  position: relative;
  background-color: white;
  z-index: 1;
`;

export const ProjectPlot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: -webkit-fixed; /* for safari */
  position: fixed;
  top: 0;
  right: 0;
  height: calc(100vh - ${APP_BAR_HEIGHT});
  width: 60%;
  top: ${APP_BAR_HEIGHT};
  background: rgba(255, 0, 0, 0.01);
`;

export const PlotContainer = styled.div`
  display: ${(props) => (props.active === "true" ? "flex" : "none")};
  opacity: ${(props) => (props.opacity !== undefined ? props.opacity : 1)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 32px;
`;

export const Plot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;

export const FrameContainer = styled.div`
  padding: 300px 24px;
`;
export const FrameTitle = styled.h1`
  line-height: 2.5;
  border-bottom: 2px solid black;
`;

export const FrameText = styled.div`
  line-height: 1.5;
  font-size: ${FRAME_FONT_SIZE}px;
  margin: ${(props) => (props.inline ? "6px 3px" : "6px 0")};
  display: ${(props) => (props.inline ? "inline-block" : "block")};
`;

export const FrameInlineWrapper = styled.span`
  line-height: 1.5;
  margin: 6px 0 6px 0;
  display: inline;
  margin-left: ${(props) => (props.first ? 0 : "2px")};
`;

export const FrameTextInline = styled(FrameInlineWrapper)`
  font-size: ${FRAME_FONT_SIZE}px;
`;

export const FrameList = styled.ul`
  line-height: 1.5;
  font-size: ${FRAME_FONT_SIZE}px;
  margin: 8px 0px;
`;
