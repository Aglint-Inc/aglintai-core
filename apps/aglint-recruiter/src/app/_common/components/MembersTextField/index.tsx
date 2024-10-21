/* eslint-disable no-unused-vars */
import { getFullName } from '@aglint/shared-utils';
import { EmptyState } from '@components/empty-state';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { AlertCircle, Check, Plus, PlusCircle, User, X } from 'lucide-react';
import React, { useState } from 'react';

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
  pillColor?: 'transparent' | 'bg-neutral-200';
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
    <div className='flex w-full flex-col items-start gap-2'>
      <div className='flex flex-row flex-wrap items-start gap-2'>
        {selectedUsers.map((user) => {
          const userName = getFullName(user.first_name, user.last_name);
          return (
            <div
              key={user.user_id}
              className={`flex items-center gap-2 rounded-full bg-muted px-2 py-1 text-sm capitalize`}
              // ${pillColor ? `${pillColor}` : 'bg-muted'}
            >
              <Avatar className='h-6 w-6 rounded-full'>
                <AvatarImage src={user.profile_image} alt={userName} />
                <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
              </Avatar>

              <span>{getFullName(user?.first_name, user?.last_name)}</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setSelectedUsers(
                    selectedUsers.filter((us) => us.user_id !== user.user_id),
                  );
                }}
                className='ml-1 h-6 w-6 rounded-full p-0 text-muted-foreground'
              >
                <X size={16} />
              </Button>
            </div>
          );
        })}
      </div>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>
          <Button variant='outline' className='text-left text-sm'>
            <PlusCircle size={16} className='mr-2' />
            {placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='z-[2000] w-full min-w-full border border-border p-0'
          style={{
            width: maxWidth,
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          {renderUsers.length === 0 ? (
            <EmptyState
              variant='inline'
              icon={User}
              header='No members found'
              description={emptyListText}
            />
          ) : (
            renderUsers.map((option, ind) => {
              const userName = getFullName(option.first_name, option.last_name);
              return (
                <div
                  key={ind}
                  className={`flex cursor-pointer items-center justify-between border-b border-border p-2`}
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

                  <Avatar className='h-6 w-6 rounded-full'>
                    <AvatarImage src={option.profile_image} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className='flex w-full flex-row items-center justify-between pl-2'>
                    <div className='one-line-clamp text-sm'>
                      {getFullName(option.first_name, option.last_name)}
                    </div>
                    <div
                      className='text-xs text-muted-foreground'
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
          <AlertCircle className='mr-1 h-4 w-4 text-destructive' />
          <p className='text-sm text-red-700'>{helperText}</p>
        </div>
      )}
    </div>
  );
}

export default MembersAutoComplete;
