/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import { MenuList, Stack, TextField, Typography } from '@mui/material';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import MuiAvatar from '@/src/components/Common/MuiAvatar';

import { setCandidateTipTapOpen } from '../store';

export default forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    setCandidateTipTapOpen(true);
    return () => {
      setTimeout(() => {
        setCandidateTipTapOpen(false);
        setFirstTime(true);
      }, 100);
    };
  }, []);

  const selectItem = (index) => {
    const item = props.items[Number(index)];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }
      setFirstTime(false);
      return false;
    },
  }));

  return (
    <Stack
      sx={{
        background: '#fff',
        position: 'relative',
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        borderRadius: '4px',
      }}
    >
      {props?.items?.length ? (
        props.items.map((item, index) => (
          <Stack
            key={index}
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            sx={{
              bgcolor: index === selectedIndex ? '#d8dcde' : '',
              p: '8px 16px',
              cursor: 'pointer',
            }}
            onClick={() => selectItem(index)}
          >
            <MuiAvatar
              src={''}
              level={item}
              variant='circular'
              height='20px'
              width='20px'
              fontSize='12px'
            />
            <Typography variant='body1'>{item}</Typography>
          </Stack>
        ))
      ) : firstTime ? (
        <Stack sx={{ p: '8px 16px' }}>Search Candidate Name</Stack>
      ) : (
        <Stack sx={{ p: '8px 16px' }}>No result</Stack>
      )}
    </Stack>
  );
});
