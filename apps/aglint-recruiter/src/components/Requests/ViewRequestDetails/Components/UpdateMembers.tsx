/* eslint-disable no-unused-vars */
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import React, { useState } from 'react';

import { type MemberType } from '@/components/Scheduling/InterviewTypes/types';

import MemberCard from './MemberCard';

function UpdateMembers({
  updateButton,
  handleChange,
  members,
}: {
  updateButton: React.ReactNode;
  handleChange: (member: MemberType) => void;
  members: MemberType[];
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{updateButton}</PopoverTrigger>
      <PopoverContent
        className='w-350 max-h-[300px] overflow-auto p-2'
        align='start'
        side='left'
      >
        <div className='flex flex-col space-y-2'>
          {members &&
            members.map((member) => (
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
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateMembers;
