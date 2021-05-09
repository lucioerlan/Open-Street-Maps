import React from 'react';
import InputMask from 'react-input-mask';

export const MaskCoordinate = (props) => {
  return (
    <InputMask
      {...props}
      mask="-99.999999"
      maskChar={null}
      style={{ border: 'none' }}
    />
  );
};
