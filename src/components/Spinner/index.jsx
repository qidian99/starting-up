import { Box } from '@material-ui/core';
import React from 'react';
import { GridLoader } from 'react-spinners';
import { appTheme } from '../../theme';

const Spinner = () => (
  <Box display="absolute" top={0} right={0} bottom={0} left={0}>
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <GridLoader size={24} color={appTheme.palette.primary.main} />
    </Box>
  </Box>
);


export default Spinner;
