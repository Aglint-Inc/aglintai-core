import { Stack } from '@mui/material';
import React, { useState } from 'react';

const RedirectWrapper: React.FC<{
  children: React.JSX.Element;
  toast: string;
  primaryUrl: string;
}> = ({ children, toast, primaryUrl }) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    primaryUrl && window.open(primaryUrl, '_blank');
  };

  const handleEnter = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Stack
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
      onClick={() => handleClick()}
      style={{ cursor: 'pointer' }}
    >
      {children}
      <Stack position={'relative'}>
        <Stack
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: '50%',
          }}
        >
          <Stack
            position={'fixed'}
            py={'var(--space-1)'}
            px={'var(--space-2)'}
            sx={{
              borderRadius: '100vh',
              color: 'var(--white)',
              backgroundColor:  'var(--neutral-4)',
              opacity: hover ? 1 : 0,
              transition: '0.25s',
              fontSize: '10px',
              textWrap: 'nowrap',
              transform: 'translate(-50%, 2px)',
            }}
          >
            {toast}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RedirectWrapper;
