import { Stack } from '@mui/material';
import React, { useState } from 'react';

const CopyWrapper: React.FC<{
  children: React.JSX.Element;
  content: string;
}> = ({ children, content }) => {
  const [hover, setHover] = useState(false);
  const [text, setText] = useState('Copy');
  const handleCopy = () => {
    setText('Copied!');
    navigator.clipboard.writeText(content);
  };

  const handleEnter = () => {
    setText('Copy');
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
      onClick={() => handleCopy()}
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
            py={'4px'}
            px={'8px'}
            sx={{
              borderRadius: '100vh',
              color: '#fff',
              backgroundColor: '#49545c',
              opacity: hover ? 1 : 0,
              transition: '0.25s',
              fontSize: '10px',
              textWrap: 'nowrap',
              transform: 'translate(-50%, 2px)',
            }}
          >
            {text}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CopyWrapper;
