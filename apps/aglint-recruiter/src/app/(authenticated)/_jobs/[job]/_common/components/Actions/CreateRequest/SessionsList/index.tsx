/* eslint-disable no-unused-vars */

import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ScrollArea } from '@components/ui/scroll-area';
import { FileQuestion } from 'lucide-react';
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
        <div className='w-full flex flex-wrap items-center gap-2 min-h-[24px] cursor-pointer'>
          {selectedSession.length > 0 ? (
            <>
              {selectedSession.map((ele, i) => (
                <Button key={i} variant='secondary' size='sm'>
                  {ele.name}
                </Button>
              ))}
              <Button variant='outline' size='sm'>
                +
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
        <PopoverContent className='w-[300px] p-0'>
          <ScrollArea className='h-[150px] w-full'>
            {sessionList.length > 0 ? (
              sessionList.map((item, i) => (
                <div
                  key={i}
                  className={`w-full px-4 py-2 rounded-md cursor-pointer hover:bg-accent ${
                    selectedSession.map((ele) => ele.id).includes(item.id)
                      ? 'bg-accent'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedSession((pre) => {
                      if (pre.map((ele) => ele.id).includes(item.id)) {
                        const data = pre.filter((ele) => ele.id !== item.id);
                        onChange?.({
                          sessions: data,
                          selected_session_id: item.id,
                          action: 'remove',
                        });
                        return data;
                      }
                      const data = [item, ...pre];
                      onChange?.({
                        sessions: data,
                        selected_session_id: item.id,
                        action: 'add',
                      });
                      return data;
                    });
                  }}
                >
                  <div className='flex items-center space-x-2'>
                    {item.type === 'panel' ? <PanelIcon /> : <IndividualIcon />}
                    <span className='text-sm'>{item.name}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center h-32 text-center'>
                <FileQuestion className='w-12 h-12 text-muted-foreground mb-2' />
                <p className='text-sm text-muted-foreground'>
                  No sessions found.
                </p>
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      )}
    </Popover>
  );
}

// You'll need to implement these icons or import them from your existing components
const PanelIcon = () => <div>Panel Icon</div>;
const IndividualIcon = () => <div>Individual Icon</div>;
