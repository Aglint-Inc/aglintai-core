/* eslint-disable no-unused-vars */
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { type MemberType } from 'src/app/_common/types/member';

import MemberCard from './MemberCard';

function UpdateMembers({
  updateButton,
  handleChange,
  side = 'left',
  members,
  placeholder = 'Search members...',
}: {
  updateButton: React.ReactNode;
  handleChange: (member: MemberType) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  members: MemberType[];
  placeholder?: string;
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
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.user_id}
                  value={
                    member.first_name +
                    ' ' +
                    member.last_name +
                    ' ' +
                    member.role
                  }
                  onSelect={(currentValue) => {
                    handleChange(member);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value ===
                        member.first_name +
                          ' ' +
                          member.last_name +
                          ' ' +
                          member.role
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  <MemberCard selectedMember={member} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateMembers;
