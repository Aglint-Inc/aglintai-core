/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { EmptyState } from '@/devlink2/EmptyState';
import { InterviewTaskPill } from '@/devlink3/InterviewTaskPill';
import { ListCard } from '@/devlink3/ListCard';
import { ListPop } from '@/devlink3/ListPop';
import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  ApiRequestInterviewSessionTask,
  ApiResponseInterviewSessionTask,
} from '@/src/pages/api/scheduling/fetch_interview_session_task';

import { meetingCardType } from '../../ViewTask/Progress/SessionCard';

type OnChangeProps = {
  sessions: meetingCardType[];
  selected_session_id?: string;
  action?: 'add' | 'remove';
};
function SessionList({
  selectedSession,
  setSelectedSession,
  isOptionList = true,
  onChange,
  application_id,
  job_id,
}: {
  selectedSession: meetingCardType[] | null;
  setSelectedSession: (x: meetingCardType[]) => void;
  isOptionList?: boolean;
  onChange?: (props: OnChangeProps) => void;
  application_id: string;
  job_id: string;
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

  const [sessionList, setSessionList] = useState<meetingCardType[]>(null);
  async function getSessionList() {
    const {
      data: { data },
    } = await axios.post('/api/scheduling/fetch_interview_session_task', {
      application_id: application_id,
      job_id: job_id,
    } as ApiRequestInterviewSessionTask);
    const sessions = data as ApiResponseInterviewSessionTask['data'];
    if (sessions) {
      setSessionList(
        sessions.map(
          (ele) =>
            ({
              id: ele.id,
              name: ele.name,
            }) as meetingCardType,
        ),
      );
    }
  }
  useEffect(() => {
    getSessionList();
  }, [application_id]);
  return (
    <>
      <Stack
        width={'100%'}
        flexWrap={'wrap'}
        onClick={handleClick}
        direction={'row'}
        // spacing={4}
        minHeight={'var(--space-6)'}
        gap={'var(--space-2)'}
        alignItems={'center'}
      >
        <ShowCode>
          <ShowCode.When isTrue={!!selectedSession.length}>
            {selectedSession.map((ele, i) => {
              return <InterviewTaskPill key={i} textInterviewName={ele.name} />;
            })}
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
            border: 'none',
          },
        }}
      >
        <ListPop
          slotListCard={
            <ShowCode>
              <ShowCode.When isTrue={sessionList && !!sessionList.length}>
                {sessionList &&
                  sessionList.map((item, i) => {
                    return (
                      <Stack
                        key={i}
                        width={'100%'}
                        p={'var(--space-1)'}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'var(--neutral-2)',
                          },
                          bgcolor:
                            selectedSession
                              .map((ele) => ele.id)
                              .includes(item.id) && 'var(--neutral-1)',
                        }}
                        onClick={() => {
                          //   @ts-ignore
                          setSelectedSession((pre: any[]) => {
                            if (
                              pre
                                .map((ele: { id: any }) => ele.id)
                                .includes(item.id)
                            ) {
                              const data = pre
                                .filter(
                                  (ele: { id: string }) => ele.id !== item.id,
                                )
                                .map((ele) => ({
                                  id: ele.id,
                                  name: ele.name,
                                }));
                              if (onChange) {
                                onChange({
                                  sessions: data as meetingCardType[],
                                  selected_session_id: item.id,
                                  action: 'remove',
                                });
                              }
                              return data;
                            }
                            const data = [item, ...pre].map((ele) => ({
                              id: ele.id,
                              name: ele.name,
                            }));
                            if (onChange) {
                              onChange({
                                sessions: data as meetingCardType[],
                                selected_session_id: item.id,
                                action: 'add',
                              });
                            }
                            return data;
                          });
                        }}
                      >
                        <ListCard isListVisible={true} textList={item.name} />
                      </Stack>
                    );
                  })}
              </ShowCode.When>

              <ShowCode.Else>
                <EmptyState textDescription={'No sessions found.'} />
              </ShowCode.Else>
            </ShowCode>
          }
        />
      </Popover>
    </>
  );
}

export default SessionList;
