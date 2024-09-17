/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Stack, Typography } from '@mui/material';
import { AlertCircle, Check, X } from 'lucide-react';
import React, { useState } from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { getFullName } from '@/utils/jsonResume';

export type MemberTypeAutoComplete = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  position: string;
};

type MembersAutoCompleteProps = {
  renderUsers: (MemberTypeAutoComplete & {
    [key: string]: any;
  })[];
  selectedUsers: (MemberTypeAutoComplete & {
    [key: string]: any;
  })[];
  setSelectedUsers: (
    val: (MemberTypeAutoComplete & {
      [key: string]: any;
    })[],
  ) => void;
  pillColor?: 'transparent' | 'var(--neutral-3)';
  maxWidth?: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  emptyListText?: string;
  onUserSelect?: (user: MemberTypeAutoComplete) => void;
};

function MembersAutoComplete({
  renderUsers,
  selectedUsers,
  setSelectedUsers,
  pillColor = 'transparent',
  maxWidth = '400px',
  error,
  helperText,
  placeholder = 'Choose from the list',
  emptyListText = 'No members found',
  onUserSelect,
}: MembersAutoCompleteProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='flex flex-row gap-2 flex-wrap'>
        {selectedUsers.map((user) => {
          return (
            <div
              key={user.user_id}
              className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm capitalize ${
                pillColor ? `bg-[${pillColor}]` : 'bg-neutral-3'
              }`}
            >
              <Avatar className='h-5 w-5 text-xs'>
                <AvatarImage
                  src={user.profile_image}
                  alt={getFullName(user?.first_name, user?.last_name)}
                />
                <AvatarFallback>
                  {getFullName(user?.first_name, user?.last_name).charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{getFullName(user?.first_name, user?.last_name)}</span>
              <button
                onClick={() => {
                  setSelectedUsers(
                    selectedUsers.filter((us) => us.user_id !== user.user_id),
                  );
                }}
                className='ml-1 text-gray-500 hover:text-gray-700'
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>
          <button className='border px-4 py-2 rounded w-full text-left'>
            {placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className='z-[2000] p-0 w-full min-w-full'
          style={{
            width: maxWidth,
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          {renderUsers.length === 0 ? (
            <div className='px-2 py-1 italic text-gray-500 cursor-default'>
              {emptyListText}
            </div>
          ) : (
            renderUsers.map((option, ind) => {
              return (
                <div
                  key={ind}
                  className={`flex items-center justify-between p-2 border-b cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
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
                    onUserSelect && onUserSelect(option);
                  }}
                >
                  <div className='flex w-6'>
                    {selectedUsers.find(
                      (user) => user.user_id === option.user_id,
                    ) && <Check size={16} />}
                  </div>

                  <MuiAvatar
                    src={option.profile_image}
                    level={getFullName(option.first_name, option.last_name)}
                    height='24px'
                    width='24px'
                    fontSize='12px'
                  />
                  <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    className='pl-2'
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
                </div>
              );
            })
          )}
        </PopoverContent>
      </Popover>
      {error && helperText && (
        <div className='flex flex-row items-center mt-1'>
          <AlertCircle className='w-4 h-4 text-red-500 mr-1' />
          <p className='text-sm text-red-700'>{helperText}</p>
        </div>
      )}
    </div>
  );
}

export default MembersAutoComplete;
