/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { EmptyState } from '@/devlink2/EmptyState';
import { InterviewTaskPill } from '@/devlink3/InterviewTaskPill';
import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  IndividualIcon,
  PanelIcon,
} from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { type meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import {
  type ApiRequestInterviewSessionTask,
  type ApiResponseInterviewSessionTask,
} from '@/src/pages/api/scheduling/fetch_interview_session_task';

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

  const [sessionList, setSessionList] =
    useState<ApiResponseInterviewSessionTask['data']>(null);
  async function getSessionList() {
    const {
      data: { data },
    } = await axios.post('/api/scheduling/fetch_interview_session_task', {
      application_id: application_id,
      job_id: job_id,
    } as ApiRequestInterviewSessionTask);
    const sessions = data as ApiResponseInterviewSessionTask['data'];
    setSessionList(sessions);
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
        minHeight={'24px'}
        gap={'var(--space-2)'}
        alignItems={'center'}
      >
        <ShowCode>
          <ShowCode.When isTrue={!!selectedSession.length}>
            <>
              {selectedSession.map((ele, i) => {
                return (
                  <ButtonSoft
                    key={i}
                    size={2}
                    textButton={ele.name}
                    color={'neutral'}
                  />
                );
              })}
              <ButtonSoft size={2} textButton={'+'} color={'accent'} />
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
                      <Stack direction={'row'} spacing={1} width={'100%'}>
                        <ShowCode>
                          <ShowCode.When isTrue={item.session_type === 'panel'}>
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
              <EmptyState textDescription={'No sessions found.'} />
            </ShowCode.Else>
          </ShowCode>
        </Stack>
      </Popover>
    </>
  );
}

export default SessionList;
