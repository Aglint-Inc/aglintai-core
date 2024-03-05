import {
  ClickAwayListener,
  Fade,
  Popper,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { RecruiterUserType } from '@/src/types/data.types';

function MembersAutoComplete({
  disabled,
  renderUsers,
  selectedUsers,
  setSelectedUsers
}: {
  disabled: boolean;
  renderUsers: RecruiterUserType[];
  selectedUsers: RecruiterUserType[];
  // eslint-disable-next-line no-unused-vars
  setSelectedUsers: (val: RecruiterUserType[]) => void;
}) {
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
      <Stack onClick={handleClick} width={'100%'}>
        <UITextField
          rest={{ id: 'list' }}
          placeholder='Choose from the list'
          disabled={disabled}
        />
      </Stack>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{
          zIndex: 1300,
          maxWidth: '400px',
          width: '100%'
        }}
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
                  maxHeight: '250px',
                  overflow: 'auto',
                  bgcolor: '#fff'
                }}
              >
                {renderUsers.length === 0 && <Stack p={2}>No members</Stack>}
                {renderUsers.map((option, ind) => {
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
                          (user) => user.user_id === option.user_id
                        )
                          ? '#F8F9F9'
                          : 'transparent',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        if (
                          !selectedUsers.find(
                            (user) => user.user_id === option.user_id
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

export default MembersAutoComplete;
