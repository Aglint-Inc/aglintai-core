/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
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
  pillColor?: 'transparent' | 'neutral-200';
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
    <div className='flex w-full flex-col gap-2'>
      <div className='flex flex-row flex-wrap gap-2'>
        {selectedUsers.map((user) => {
          return (
            <div
              key={user.user_id}
              className={`flex items-center gap-2 rounded-full px-2 py-1 text-sm capitalize ${pillColor ? `bg-${pillColor}` : 'bg-neutral-300'
                }`}
            >
              <MuiAvatar
                    src={user.profile_image}
                    level={getFullName(user?.first_name, user?.last_name)}
                    height='24px'
                    width='24px'
                    fontSize='12px'
                  />
              
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
          <button className='w-full rounded border px-4 py-2 text-left'>
            {placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className='z-[2000] w-full min-w-full p-0'
          style={{
            width: maxWidth,
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          {renderUsers.length === 0 ? (
            <div className='cursor-default px-2 py-1 italic text-gray-500'>
              {emptyListText}
            </div>
          ) : (
            renderUsers.map((option, ind) => {
              return (
                <div
                  key={ind}
                  className={`flex cursor-pointer items-center justify-between border-b p-2`}
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
                  <div
                    className='pl-2 flex flex-row justify-between w-full items-center'
                  >
                    <div
                      className='one-line-clamp text-sm'
                    >
                      {getFullName(option.first_name, option.last_name)}
                    </div>
                    <div
                      className='text-xs text-gray-500'
                      style={{ textTransform: 'capitalize' }}
                    >
                      {option.position || ''}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </PopoverContent>
      </Popover>
      {error && helperText && (
        <div className='mt-1 flex flex-row items-center'>
          <AlertCircle className='mr-1 h-4 w-4 text-red-500' />
          <p className='text-sm text-red-700'>{helperText}</p>
        </div>
      )}
    </div>
  );
}

export default MembersAutoComplete;
