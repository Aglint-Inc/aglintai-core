import { Button, Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import { IconChevronDown } from '@/devlink/IconChevronDown';
import { useJobs } from '@/src/context/JobsContext';

function JobsPopOver({ currecntJob }) {
  const { jobs } = useJobs();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Stack>
      <Button
        endIcon={<IconChevronDown />}
        variant='text'
        onClick={handleClick}
      >
        {currecntJob}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
            boxShadow: '3px 3px 20px 0px #0000001a',
            borderRadius: '10px',
          },
        }}
      >
        <Stack direction={'column'} p={'20px'} spacing={'8px'}>
          {jobs.data.length &&
            jobs.data.map((job, i) => {
              return (
                <>
                  <Stack
                    sx={{
                      p: 2,
                      justifyContent: 'start',
                      cursor: 'pointer',
                      bgcolor: '#F7F9FB',
                      borderRadius: '10px',
                    }}
                    key={i}
                    onClick={async () => {
                      // window.location.href = `localhost:3000/jobs/${job.id}`;
                      router.push(`/jobs/${job.id}`);
                      setAnchorEl(null);
                    }}
                    direction={'row'}
                    spacing={'10px'}
                  >
                    <Typography>{capitalize(job.job_title)}</Typography>
                    <Typography variant='body2'>
                      {capitalize(job.job_type)}
                    </Typography>
                    <Typography variant='body2'>
                      {capitalize(job.location)}
                    </Typography>
                  </Stack>
                </>
              );
            })}
        </Stack>
      </Popover>
    </Stack>
  );
}

export default JobsPopOver;
