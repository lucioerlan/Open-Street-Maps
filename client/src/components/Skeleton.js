import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

export const SkeletonCustomers = () => {
  return (
    <Box
      style={{
        display: 'flex', flexWrap: 'wrap', marginTop: '-9%', boxSizing: 'border-box'
      }}
    >
      <Skeleton animation="wave" height="100vh" width="100%" />
    </Box>
  );
};
