import { Popover, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { useJobs } from '@/src/context/JobsContext';

import {
  FilterType,
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

function FilterJob() {
  const { jobs } = useJobs();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const filter = useFilterCandidateStore((state) => state.filter);
  const filterVisible = useFilterCandidateStore((state) => state.filterVisible);

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

  const allJobs = useMemo(() => {
    return jobs?.data?.filter((job) => job.status === 'published');
  }, [jobs?.data]);

  return (
    <>
      <ButtonFilter
        isActive={filter.job_ids.length > 0}
        slotLeftIcon={
          <Stack>
            <GlobalIcon iconName='business_center' />
          </Stack>
        }
        isDotVisible={filter.job_ids.length > 0}
        onClickStatus={{
          id: FilterType.jobs + 'click',
          onClick: handleClick,
        }}
        textLabel={'Job Title'}
        slotRightIcon={
          <Stack>
            <GlobalIcon
              iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            />
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
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 'var(--radius-4)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          slotOption={
            <Stack spacing={2} maxHeight={'50vh'} overflow={'auto'}>
              {allJobs?.map((job) => {
                return (
                  <Stack
                    key={job.id}
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      ':hover': { bgcolor: 'var(--neutral-2)' },
                      borderRadius: 'var(--radius-2)',
                    }}
                    spacing={1}
                    padding={'var(--space-2) var(--space-3)'}
                    marginTop={'0px !important'}
                  >
                    <Checkbox
                      isChecked={filter.job_ids.includes(job.id)}
                      onClickCheck={{
                        onClick: () => {
                          handleFilterClick(job.id);
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleFilterClick(job.id)}
                    >
                      {job.job_title} ({job.section_count.interview})
                    </Typography>
                  </Stack>
                );
              })}
              {allJobs?.length === 0 && 'No Jobs'}
            </Stack>
          }
          onClickDelete={{
            onClick: () => {
              setFilter({ job_ids: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.jobs),
              );
            },
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ job_ids: [] });
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterJob;
