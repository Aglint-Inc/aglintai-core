/* eslint-disable no-unused-vars */
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import React, { useState } from 'react';

import UITextField from '@/components/Common/UITextField';

import { type MemberType } from '../Scheduling/InterviewTypes/types';
import MemberCard from './MemberCard';

function UpdateMembers({
  updateButton,
  handleChange,
  side = 'left',
  members,
}: {
  updateButton: React.ReactNode;
  handleChange: (member: MemberType) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  members: MemberType[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  if (!members) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{updateButton}</PopoverTrigger>
      <PopoverContent
        className='min-w-450 flex flex-col gap-4 p-2'
        align='start'
        side={side}
      >
        <UITextField
          placeholder='Search members'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full h-8'
          width={'100%'}
        />
        <div className='flex flex-col space-y-2 max-h-[300px] overflow-auto'>
          {members
            .filter((member) =>
              member.first_name.toLowerCase().includes(value.toLowerCase()),
            )
            .map((member) => (
              <Label
                key={member.user_id}
                onClick={() => {
                  handleChange(member);
                  setOpen(false);
                }}
                className='cursor-pointer hover:bg-slate-200 p-2 rounded-md'
              >
                <MemberCard selectedMember={member} />
              </Label>
            ))}
          {members.filter((member) =>
            member.first_name.toLowerCase().includes(value.toLowerCase()),
          ).length === 0 ? (
            <p>No member found</p>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateMembers;
