const { default: styled } = require("styled-components");


/* Components */
export const ProjectContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-template-columns: 40% 60%;
`;

export const ProjectContext = styled.div`
  position: relative;
  border: 1px solid red;
  background-color: white;
  padding-top: 20vh;
  z-index: 1;
`;

export const ProjectPlot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: -webkit-sticky; /* for safari */
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  border: 1px solid black;
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
