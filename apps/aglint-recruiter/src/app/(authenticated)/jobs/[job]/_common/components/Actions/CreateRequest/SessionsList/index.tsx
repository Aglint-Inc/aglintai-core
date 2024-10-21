/* eslint-disable no-unused-vars */

import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Check, Plus, User, Users } from 'lucide-react';
import React from 'react';

export type SessionType = {
  id: string;
  name: string;
  type: 'debrief' | 'panel' | 'individual';
};

type OnChangeProps = {
  sessions: SessionType[];
  selected_session_id?: string;
  action?: 'add' | 'remove';
};

export function SessionList({
  selectedSession,
  setSelectedSession,
  isOptionList = true,
  onChange,
  sessionList,
}: {
  selectedSession: SessionType[];
  setSelectedSession: React.Dispatch<React.SetStateAction<SessionType[]>>;
  isOptionList?: boolean;
  onChange?: (props: OnChangeProps) => void;
  sessionList: SessionType[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex min-h-[24px] w-full cursor-pointer flex-wrap items-center gap-2'>
          {selectedSession.length > 0 ? (
            <>
              <Button variant='outline' size='sm'>
                <Plus className='h-4 w-4' />
              </Button>
            </>
          ) : (
            <span className='text-sm text-muted-foreground'>
              Select Session
            </span>
          )}
        </div>
      </PopoverTrigger>
      {isOptionList && (
        <PopoverContent className='flex max-h-[300px] min-w-[300px] flex-col gap-1 overflow-auto p-2'>
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Sessions'>
                {sessionList.map((item, i) => {
                  return (
                    <CommandItem key={i} value={item.id}>
                      <div
                        onClick={() => {
                          const exist = selectedSession
                            .map((ele) => ele.id)
                            .includes(item.id);
                          if (selectedSession.length > 1 && exist) {
                            setSelectedSession((pre) => {
                              const data = pre.filter(
                                (ele) => ele.id !== item.id,
                              );
                              onChange?.({
                                sessions: data,
                                selected_session_id: item.id,
                                action: 'remove',
                              });
                              return data;
                            });
                          }
                          if (!exist) {
                            setSelectedSession((pre) => {
                              const data = [...pre, item];
                              onChange?.({
                                sessions: data,
                                selected_session_id: item.id,
                                action: 'add',
                              });
                              return data;
                            });
                          }
                        }}
                        className='flex flex-row items-center gap-2 space-x-2'
                      >
                        {item.type === 'panel' ? (
                          <PanelIcon />
                        ) : (
                          <IndividualIcon />
                        )}
                        {item.name}
                        {selectedSession
                          .map((ele) => ele.id)
                          .includes(item.id) && <Check className='h-4 w-4' />}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}

// You'll need to implement these icons or import them from your existing components
const PanelIcon = () => <Users className='h-4 w-4' />;
const IndividualIcon = () => <User className='h-4 w-4' />;
