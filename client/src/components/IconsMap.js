import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import LocalShipping from '@material-ui/icons/LocalShipping';

const IconRed = () => {
  return (
    <Tooltip title="Icon highlighter">
      <IconButton>
        <LocalShipping
          color="secondary"
          style={{ fontSize: '30px' }}
          alt="Icon highlighter"
        />
      </IconButton>
    </Tooltip>
  );
};

const IconBlue = () => {
  return (
    <Tooltip title="Icon highlighter Default">
      <IconButton>
        <LocalShipping
          color="primary"
          style={{ fontSize: '30px' }}
          alt="Icon highlighter Default"
        />
      </IconButton>
    </Tooltip>
  );
};

export { IconRed, IconBlue };
