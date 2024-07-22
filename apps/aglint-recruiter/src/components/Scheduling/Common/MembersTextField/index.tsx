/* eslint-disable no-unused-vars */
import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';

import { PanelMemberPill } from '@/devlink2/PanelMemberPill';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { InterviewScheduleContextType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { getFullName } from '@/src/utils/jsonResume';

import { MemberType } from '../../InterviewTypes/types';

export type MemberTypeAutoComplete = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  position: string;
} & Record<string, any>;

type MembersAutoCompleteProps = {
  disabled: boolean;
  renderUsers: InterviewScheduleContextType['members'];
  selectedUsers: MemberTypeAutoComplete[];
  setSelectedUsers: (val: MemberTypeAutoComplete[]) => void;
  pillColor?: string;
  maxWidth?: string;
  error?: boolean;
  helperText?: string;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
  emptyListText?: string;
  isPillsVisible?: boolean;
};

function MembersAutoComplete({
  disabled,
  renderUsers,
  selectedUsers,
  setSelectedUsers,
  pillColor = 'transparent',
  maxWidth = '400px',
  error,
  helperText,
  setError,
  placeholder = 'Choose from the list',
  emptyListText = 'No members found',
  isPillsVisible = true,
}: MembersAutoCompleteProps) {
  const textFieldRef = useRef(null);

  const handlePlaceholderClick = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
      // Trigger a mouse down event to open the select dropdown
      const event = new MouseEvent('mousedown', {
        bubbles: true,
      });
      textFieldRef.current.dispatchEvent(event);
    }
  };

  return (
    <Stack width={'100%'}>
      {isPillsVisible && (
        <Stack gap={1} direction={'row'} sx={{ flexWrap: 'wrap' }}>
          {selectedUsers.map((user) => {
            return (
              <Stack key={user.user_id} marginBottom={'var(--space-2)'}>
                <PanelMemberPill
                  key={user.user_id}
                  propsBgColor={{
                    style: {
                      background: pillColor ? pillColor : 'var(--neutral-3)',
                      textTransform: 'capitalize',
                    },
                  }}
                  onClickClose={{
                    onClick: () => {
                      setSelectedUsers(
                        selectedUsers.filter(
                          (us) => us.user_id !== user.user_id,
                        ),
                      );
                    },
                  }}
                  slotImage={
                    <MuiAvatar
                      src={user.profile_image}
                      level={getFullName(user?.first_name, user?.last_name)}
                      variant='rounded'
                      height='20px'
                      width='20px'
                      fontSize='12px'
                    />
                  }
                  textMemberName={getFullName(
                    user?.first_name,
                    user?.last_name,
                  )}
                />
              </Stack>
            );
          })}
        </Stack>
      )}

      <TextField
        ref={textFieldRef}
        fullWidth={true}
        helperText={helperText}
        error={error}
        id={'list'}
        placeholder='Choose from the list'
        disabled={disabled}
        select
        sx={{
          width: '100%',
          maxWidth: maxWidth,
          '& .MuiSelect-select span::before': {
            content: `"${placeholder}"`,
            color: 'var(--neutral-11)',
          },
          '& .MuiList-root-MuiMenu-list': {
            padding: '0px !important',
          },
        }}
        value={[]}
        SelectProps={{
          multiple: true,
          MenuProps: {
            PaperProps: {
              sx: {
                paddingTop: 0,
                paddingBottom: 0,
                mt: 1,
                '& .MuiList-root': {
                  paddingTop: 0,
                  paddingBottom: 0,
                },
                maxHeight: '40vh',
              },
              onMouseDown: (event) => {
                event.stopPropagation();
              },
            },
          },
        }}
      >
        {renderUsers.length === 0 && (
          <Stack p={'4px 16px'}>{emptyListText}</Stack>
        )}
        {renderUsers.map((option, ind) => {
          return (
            <MenuItem key={ind} sx={{ p: 0 }}>
              <Stack
                key={option.user_id}
                direction='row'
                alignItems='center'
                spacing={2}
                sx={{
                  width: '100%',
                  p: '6px 8px',
                  borderTop: ind === 0 ? 'none' : '1px solid var(--neutral-6)',
                  backgroundColor: selectedUsers.find(
                    (user) => user.user_id === option.user_id,
                  )
                    ? 'var(--neutral-3)'
                    : 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  error && setError(false);
                  if (
                    !selectedUsers.find(
                      (user) => user.user_id === option.user_id,
                    )
                  ) {
                    setSelectedUsers([...selectedUsers, option]);
                  } else {
                    setSelectedUsers(
                      selectedUsers.filter(
                        (user) => user.user_id !== option.user_id,
                      ),
                    );
                  }
                }}
              >
                <MuiAvatar
                  src={option.profile_image}
                  level={getFullName(option.first_name, option.last_name)}
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
                    variant='body1'
                    className='one-line-clamp'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {getFullName(option.first_name, option.last_name)}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {option.position || ''}
                  </Typography>
                </Stack>
              </Stack>
            </MenuItem>
          );
        })}
      </TextField>
    </Stack>
  );
}

export default MembersAutoComplete;
