import {
  ClickAwayListener,
  Fade,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { setSelectedUsers, useSchedulingStore } from '../../store';

function TeamAutoComplete({ loading }) {
  const { members } = useAuthDetails();

  const selectedUsers = useSchedulingStore((state) => state.selectedUsers);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleClickAway = () => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Stack onClick={handleClick}>
        <UITextField
          rest={{ id: 'list' }}
          placeholder='Choose from the list'
          disabled={loading}
        />
      </Stack>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 1200, maxWidth: '410px', width: '100%' }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Stack
                width={'100%'}
                sx={{
                  border: '1px solid #E9EBED',
                  boxShadow: '0px 4px 8px 0px #04444D26',
                  borderRadius: '10px',
                  mt: '10px',
                }}
              >
                {members
                  .filter((user: any) => user.schedule_auth?.access_token)
                  .map((option, ind) => {
                    return (
                      <Stack
                        key={option.user_id}
                        direction='row'
                        alignItems='center'
                        spacing={2}
                        sx={{
                          width: '100%',
                          p: '8px 16px',
                          borderTop: ind === 0 ? 'none' : '1px solid #F8F9F9',
                          backgroundColor: selectedUsers.find(
                            (user) => user.user_id === option.user_id,
                          )
                            ? '#F8F9F9'
                            : 'transparent',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (
                            !selectedUsers.find(
                              (user) => user.user_id === option.user_id,
                            )
                          ) {
                            setSelectedUsers([...selectedUsers, option]);
                          }
                        }}
                      >
                        <MuiAvatar
                          src={option.profile_image}
                          level={option.first_name}
                          variant='circular'
                          height='24px'
                          width='24px'
                          fontSize='12px'
                        />
                        <Stack
                          direction={'row'}
                          justifyContent={'space-between'}
                          width={'100%'}
                        >
                          <Typography
                            variant='subtitle2'
                            className='one-line-clamp'
                          >
                            {option.first_name}
                          </Typography>
                          <Typography
                            variant='caption'
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {option.role}
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
              </Stack>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default TeamAutoComplete;
