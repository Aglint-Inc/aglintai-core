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
import { ScrollArea } from '@components/ui/scroll-area';
import { cn } from '@lib/utils';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { type MemberType } from 'src/app/_common/types/memberType';

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
              <ScrollArea className='h-64'>
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
                    onSelect={() => {
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
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateMembers;
