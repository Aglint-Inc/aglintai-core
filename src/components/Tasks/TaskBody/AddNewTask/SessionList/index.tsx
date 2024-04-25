/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { EmptyState } from '@/devlink2';
import { InterviewTaskPill, ListCard, ListPop } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { fetchInterviewSessionTask } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/utils';

function SessionList({
  selectedSession,
  setSelectedSession,
  sessionList,
  isOptionList = true,
  onChange,
}: {
  selectedSession: Awaited<ReturnType<typeof fetchInterviewSessionTask>> | null;
  sessionList: Awaited<ReturnType<typeof fetchInterviewSessionTask>>;
  setSelectedSession: (
    x: Awaited<ReturnType<typeof fetchInterviewSessionTask>>,
  ) => void;
  isOptionList?: boolean;
  onChange?: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: { currentTarget: any }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Stack
        flexWrap={'wrap'}
        onClick={handleClick}
        direction={'row'}
        // spacing={4}
        minHeight={'30px'}
        gap={'8px'}
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
          horizontal: 'right',
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
                        p={'4px'}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'grey.100',
                          },
                          bgcolor:
                            selectedSession
                              .map((ele) => ele.id)
                              .includes(item.id) && 'grey.100',
                        }}
                        onClick={() => {
                          //   @ts-ignore
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
                                onChange(data);
                              }
                              return data;
                            }
                            const data = [item, ...pre];
                            if (onChange) {
                              onChange(data);
                            }
                            return data;
                          });
                        }}
                      >
                        <ListCard isListVisible={true} textList={item.name} />
                        {/* <InterviewTaskPill
                          onClickPill={{
                            style: {
                              backgroundColor:
                                selectedSession
                                  .map((ele) => ele.id)
                                  .includes(item.id) && '#90caf9bb',
                            },
                          }}
                          textInterviewName={item.name}
                        /> */}
                      </Stack>
                    );
                  })}
              </ShowCode.When>

              <ShowCode.Else>
                <EmptyState textDescription={'Sessions are not available!'} />
              </ShowCode.Else>
            </ShowCode>
          }
        />
      </Popover>
    </>
  );
}

export default SessionList;
