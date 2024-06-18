import { Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
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
      <ButtonGhost
        size={2}
        textButton={currecntJob}
        iconName='stat_minus_1'
        isRightIcon
        onClickButton={{
          onClick: handleClick,
        }}
      />
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
            boxShadow: 'var(--shadow-3)',
            borderRadius: 'var(--radius-4)',
          },
        }}
      >
        <Stack
          direction={'column'}
          p={'var(--space-5)'}
          spacing={'var(--space-2)'}
        >
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
                      borderRadius: 'var(--radius-4)',
                    }}
                    key={i}
                    onClick={async () => {
                      // window.location.href = `localhost:3000/jobs/${job.id}`;
                      router.push(`/jobs/${job.id}`);
                      setAnchorEl(null);
                    }}
                    direction={'row'}
                    spacing={'var(--space-2)'}
                  >
                    <Typography>{capitalize(job.job_title)}</Typography>
                    <Typography variant='body1'>
                      {capitalize(job.job_type)}
                    </Typography>
                    <Typography variant='body1'>
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
