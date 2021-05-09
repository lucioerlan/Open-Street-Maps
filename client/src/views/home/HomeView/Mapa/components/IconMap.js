import React from 'react';
import { Tooltip } from '@material-ui/core';

import { ReactComponent as MapaIco } from 'src/assets/images/mapa/truck.svg';

export const IconMap = ({ theme }) => {
  return (
    <Tooltip title="Icon highlighter">
      <MapaIco fill={theme} style={{ width: '50px' }} alt="Icon highlighter" />
    </Tooltip>
  );
};
