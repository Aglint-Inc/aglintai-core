/* eslint-disable no-unused-vars */

import { Popover, Stack, Typography } from '@mui/material';
import { FileQuestion } from 'lucide-react';
import React from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';
import {
  IndividualIcon,
  PanelIcon,
} from '@/job/interview-plan/components/sessionForms';

export type sessionType = {
  id: string;
  name: string;
  type: 'debrief' | 'panel' | 'individual';
};

type OnChangeProps = {
  sessions: sessionType[];
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
  selectedSession: sessionType[] | null;
  setSelectedSession: (x: sessionType[]) => void;
  isOptionList?: boolean;
  onChange?: (props: OnChangeProps) => void;
  sessionList: sessionType[];
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event: { currentTarget: any }) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        width={'100%'}
        flexWrap={'wrap'}
        onClick={handleClick}
        direction={'row'}
        // spacing={4}
        minHeight={'24px'}
        gap={'var(--space-2)'}
        alignItems={'center'}
      >
        <ShowCode>
          <ShowCode.When isTrue={!!selectedSession.length}>
            <>
              {selectedSession.map((ele, i) => {
                return (
                  <UIButton key={i} variant={'secondary'}>
                    {ele.name}
                  </UIButton>
                );
              })}
              <UIButton variant={'default'}>+</UIButton>
            </>
          </ShowCode.When>

          <ShowCode.Else>
            <Typography fontSize={'14px'} variant='caption'>
              Select Session
            </Typography>
          </ShowCode.Else>
        </ShowCode>
      </Stack>
      <Popover
        id={id}
        open={open && isOptionList}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            // border: 'none',
            height: '150px',
            maxHeight: '200px',
            width: '300px',
          },
        }}
      >
        <Stack bgcolor={'#fff'} p={0.5} overflow={'scroll'} height={'100%'}>
          <ShowCode>
            <ShowCode.When isTrue={sessionList && !!sessionList.length}>
              {sessionList &&
                sessionList.map((item, i) => {
                  return (
                    <Stack
                      key={i}
                      width={'100%'}
                      px={1}
                      py={0.5}
                      borderRadius={`6px`}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'var(--neutral-2)',
                        },
                        bgcolor:
                          selectedSession
                            .map((ele) => ele.id)
                            .includes(item.id) && 'var(--neutral-2)',
                      }}
                      onClick={() => {
                        //   @ts-expect-error
                        setSelectedSession((pre: any[]) => {
                          if (
                            pre
                              .map((ele: { id: any }) => ele.id)
                              .includes(item.id)
                          ) {
                            const data = pre.filter(
                              (ele: { id: string }) => ele.id !== item.id,
                            );
                            if (onChange) {
                              onChange({
                                sessions: data,
                                selected_session_id: item.id,
                                action: 'remove',
                              });
                            }
                            return data;
                          }
                          const data = [item, ...pre];
                          if (onChange) {
                            onChange({
                              sessions: data,
                              selected_session_id: item.id,
                              action: 'add',
                            });
                          }
                          return data;
                        });
                      }}
                    >
                      <Stack direction={'row'} spacing={1} width={'100%'}>
                        <ShowCode>
                          <ShowCode.When isTrue={item.type === 'panel'}>
                            <PanelIcon />
                          </ShowCode.When>
                          <ShowCode.Else>
                            <IndividualIcon />
                          </ShowCode.Else>
                        </ShowCode>
                        <Typography ml={1} fontSize={'14px'} variant='caption'>
                          {item.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })}
            </ShowCode.When>

            <ShowCode.Else>
              <div className='flex flex-col items-center justify-center h-32 text-center'>
                <FileQuestion className='w-12 h-12 text-muted-foreground mb-2' />
                <p className='text-sm text-muted-foreground'>
                  No sessions found.
                </p>
              </div>
            </ShowCode.Else>
          </ShowCode>
        </Stack>
      </Popover>
    </>
  );
}
