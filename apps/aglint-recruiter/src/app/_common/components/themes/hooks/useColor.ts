import React from 'react';

import { ColorContext } from '../context/colorProvider';

export const useColor = () => {
  const value = React.useContext(ColorContext);
  if (!value) throw new Error('ColorContext not found as a provider');
  return value;
};
