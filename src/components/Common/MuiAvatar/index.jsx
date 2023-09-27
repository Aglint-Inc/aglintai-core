import { Avatar, Typography } from '@mui/material';
import React from 'react';

function MuiAvatar({ level, width, height, variant, src, fontSize }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color + '70';
  }

  function stringAvatar(value) {
    return {
      sx: {
        width: width ? width : '40px',
        height: height ? height : '40px',
        bgcolor: value && stringToColor(value),
      },
      children: (
        <Typography
          position={'relative'}
          bottom={'2px'}
          left={'0.5px'}
          color={'white.700'}
          fontSize={fontSize}
        >
          {value ? value[0] : '0'}
        </Typography>
      ),
    };
  }
  return (
    <Avatar src={src ? src : '/'} variant={variant} {...stringAvatar(level)} />
  );
}

export default MuiAvatar;
