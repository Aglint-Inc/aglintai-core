/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { ListCard, ListPop } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useJobs } from '@/src/context/JobsContext';

function JobList({
  selectedJob,
  setSelectedJob,
  isOptionList = true,
}: {
  selectedJob: { name: string; id: string };
  setSelectedJob: (x: { name: string; id: string }) => void;
  isOptionList: boolean;
}) {
  const {
    jobs: { data: jobs },
  } = useJobs();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
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
        sx={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <ShowCode>
          <ShowCode.When isTrue={!!selectedJob?.id}>
            <ListCard textList={capitalize(selectedJob?.name)} />
          </ShowCode.When>
          <ShowCode.Else>
            <Typography variant='caption' fontSize={'14px'}>
              Select Job
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
          slotListCard={jobs.map((ele, i) => {
            return (
              <Stack
                key={i}
                p={'4px'}
                width={'100%'}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
                onClick={() => {
                  setSelectedJob({ name: ele.job_title, id: ele.id });
                  handleClose();
                }}
              >
                <ListCard textList={capitalize(ele.job_title)} />
              </Stack>
            );
          })}
        />
      </Popover>
    </>
  );
}

export default JobList;
