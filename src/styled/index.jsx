const { default: styled } = require("styled-components");

export const APP_BAR_HEIGHT_INT = 64;
export const APP_BAR_HEIGHT = APP_BAR_HEIGHT_INT + 'px';

/* Components */
export const ProjectContainer = styled.div`
  margin-top: ${APP_BAR_HEIGHT};
  display: grid;
  grid-template-columns: 40vw auto;
`;

export const ProjectText = styled.div`
  position: relative;
  border: 1px solid red;
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
  border: 1px solid black;
  top: ${APP_BAR_HEIGHT};
  background: rgba(255,0,0,0.01);
`;

export const PlotContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  opacity: ${(props) => (props.opacity ? props.opacity : 1)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
`;


export const ActionButtonContainer = styled.div`
  diplay: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
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
  line-height: 2;
  border-bottom: 2px solid black;
`;

export const FrameText = styled.div`
  line-height: 1.5;
  margin: 5px 0px;
`;
