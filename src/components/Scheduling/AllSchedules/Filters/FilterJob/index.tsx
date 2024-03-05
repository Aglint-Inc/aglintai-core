import { Popover, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import { Checkbox } from '@/devlink';
import { ButtonFilter, FilterDropdown } from '@/devlink2';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';

import {
  FilterType,
  setFilter,
  setFilterVisible,
  useInterviewSchedulingStore
} from '../../store';

function FilterJob() {
  const { jobsData } = useJobs();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const filter = useInterviewSchedulingStore((state) => state.filter);
  const filterVisible = useInterviewSchedulingStore(
    (state) => state.filterVisible
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'jobs-filter' : undefined;

  const handleFilterClick = (job_id: string) => {
    if (filter.job_ids.includes(job_id)) {
      setFilter({ job_ids: filter.job_ids.filter((s) => s !== job_id) });
    } else {
      setFilter({ job_ids: [...filter.job_ids, job_id] });
    }
  };

  useEffect(() => {
    return () => {
      setFilter({ job_ids: [] });
    };
  }, []);

  return (
    <>
      <ButtonFilter
        slotLeftIcon={
          <Stack>
            <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.25 3.125V4.25H9.75V3.125C9.73438 2.89062 9.60938 2.76563 9.375 2.75H5.625C5.39062 2.76563 5.26562 2.89062 5.25 3.125ZM4.5 4.25V3.125C4.51562 2.8125 4.625 2.54687 4.82812 2.32812C5.04688 2.125 5.3125 2.01563 5.625 2H9.375C9.6875 2.01563 9.95312 2.125 10.1719 2.32812C10.375 2.54687 10.4844 2.8125 10.5 3.125V4.25H12C12.4219 4.26562 12.7734 4.41406 13.0547 4.69531C13.3359 4.97656 13.4844 5.32812 13.5 5.75V11.75C13.4844 12.1719 13.3359 12.5234 13.0547 12.8047C12.7734 13.0859 12.4219 13.2344 12 13.25H3C2.57812 13.2344 2.22656 13.0859 1.94531 12.8047C1.66406 12.5234 1.51562 12.1719 1.5 11.75V5.75C1.51562 5.32812 1.66406 4.97656 1.94531 4.69531C2.22656 4.41406 2.57812 4.26562 3 4.25H4.5ZM10.125 5H4.875H3C2.78125 5 2.60156 5.07031 2.46094 5.21094C2.32031 5.35156 2.25 5.53125 2.25 5.75V8H5.625H6.375H8.625H9.375H12.75V5.75C12.75 5.53125 12.6797 5.35156 12.5391 5.21094C12.3984 5.07031 12.2188 5 12 5H10.125ZM12.75 8.75H9.375V9.875C9.375 10.0938 9.30469 10.2734 9.16406 10.4141C9.02344 10.5547 8.84375 10.625 8.625 10.625H6.375C6.15625 10.625 5.97656 10.5547 5.83594 10.4141C5.69531 10.2734 5.625 10.0938 5.625 9.875V8.75H2.25V11.75C2.25 11.9688 2.32031 12.1484 2.46094 12.2891C2.60156 12.4297 2.78125 12.5 3 12.5H12C12.2188 12.5 12.3984 12.4297 12.5391 12.2891C12.6797 12.1484 12.75 11.9688 12.75 11.75V8.75ZM6.375 8.75V9.875H8.625V8.75H6.375Z'
                fill='#2F3941'
              />
            </svg>
          </Stack>
        }
        onClickStatus={{
          style: {
            borderColor:
              filter.job_ids.length > 0 ? palette.blue[600] : palette.blue[300]
          },
          onClick: handleClick
        }}
        textLabel={'Related Jobs'}
        slotRightIcon={
          <Stack>
            <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.75781 11.2578C7.58594 11.4141 7.41406 11.4141 7.24219 11.2578L2.74219 6.75781C2.58594 6.58594 2.58594 6.41406 2.74219 6.24219C2.91406 6.08594 3.08594 6.08594 3.25781 6.24219L7.5 10.4609L11.7422 6.24219C11.9141 6.08594 12.0859 6.08594 12.2578 6.24219C12.4141 6.41406 12.4141 6.58594 12.2578 6.75781L7.75781 11.2578Z'
                fill='#0F3554'
              />
            </svg>
          </Stack>
        }
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '10px',
            borderColor: '#E9EBED',
            minWidth: '176px'
          }
        }}
      >
        <FilterDropdown
          slotOption={jobsData?.jobs?.map((job) => {
            return (
              <Stack
                key={job.id}
                direction={'row'}
                sx={{ alignItems: 'center' }}
                spacing={1}
              >
                <Checkbox
                  isChecked={filter.job_ids.includes(job.id)}
                  onClickCheck={{
                    onClick: () => {
                      handleFilterClick(job.id);
                    }
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleFilterClick(job.id)}
                >
                  {job.job_title}
                </Typography>
              </Stack>
            );
          })}
          onClickDelete={{
            onClick: () => {
              setFilter({ job_ids: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.relatedJobs)
              );
            }
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ job_ids: [] });
            }
          }}
        />
      </Popover>
    </>
  );
}

export default FilterJob;
