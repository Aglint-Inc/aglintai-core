/* eslint-disable no-unused-vars */

import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { FileQuestion, User, Users } from 'lucide-react';
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
        <PopoverContent className='flex max-h-[300px] min-w-[300px] flex-col gap-1 overflow-auto p-2'>
          {sessionList.length > 0 ? (
            sessionList.map((item, i) => (
              <div
                key={i}
                className={`w-full cursor-pointer rounded-md px-4 py-2 hover:bg-accent ${
                  selectedSession.map((ele) => ele.id).includes(item.id)
                    ? 'bg-accent'
                    : ''
                }`}
                onClick={() => {
                  const exist = selectedSession
                    .map((ele) => ele.id)
                    .includes(item.id);
                  if (selectedSession.length > 1 && exist) {
                    setSelectedSession((pre) => {
                      const data = pre.filter((ele) => ele.id !== item.id);
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
              >
                <div className='flex items-center space-x-2'>
                  {item.type === 'panel' ? <PanelIcon /> : <IndividualIcon />}
                  <span className='text-sm'>{item.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div className='flex h-32 flex-col items-center justify-center text-center'>
              <FileQuestion className='mb-2 h-12 w-12 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>
                No sessions found.
              </p>
            </div>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
}

// You'll need to implement these icons or import them from your existing components
const PanelIcon = () => <Users className='h-4 w-4' />;
const IndividualIcon = () => <User className='h-4 w-4' />;
