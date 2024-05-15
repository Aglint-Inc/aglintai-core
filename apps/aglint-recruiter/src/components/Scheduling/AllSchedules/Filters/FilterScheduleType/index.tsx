import { InterviewSession } from '@aglint/shared-types';
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink';
import { ButtonFilter, FilterDropdown } from '@/devlink2';

import {
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';
import { FilterType } from '../../store';

function FilterScheduleType() {
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
  const id = open ? 'filter-schedule-type' : undefined;

  const handleFilterClick = (
    scheduleType: InterviewSession['schedule_type'],
  ) => {
    if (filter.scheduleType.includes(scheduleType)) {
      setFilter({
        scheduleType: filter.scheduleType.filter((s) => s !== scheduleType),
      });
    } else {
      setFilter({ scheduleType: [...filter.scheduleType, scheduleType] });
    }
  };

  const renderScheduleType = (
    scheduleType: InterviewSession['schedule_type'],
    label: string,
  ) => {
    return (
      <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={1}>
        <Checkbox
          isChecked={filter.scheduleType.includes(scheduleType)}
          onClickCheck={{
            onClick: () => {
              handleFilterClick(scheduleType);
            },
          }}
        />
        <Typography
          key={label}
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => handleFilterClick(scheduleType)}
        >
          {label}
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <ButtonFilter
        isActive={filter.scheduleType.length > 0}
        isDotVisible={filter.scheduleType.length > 0}
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
                d='M3 2.375V2.77344L12.3984 6.00781C12.6172 6.10156 12.7344 6.26562 12.75 6.5C12.7344 6.73438 12.6172 6.89844 12.3984 6.99219L3 10.2266V13.625C2.98438 13.8594 2.85938 13.9844 2.625 14C2.39062 13.9844 2.26562 13.8594 2.25 13.625V10.25V9.5V3.5V2.75V2.375C2.26562 2.14062 2.39062 2.01563 2.625 2C2.85938 2.01563 2.98438 2.14062 3 2.375ZM3 3.57031V9.42969L11.5312 6.5L3 3.57031Z'
                fill='#0F3554'
              />
            </svg>
          </Stack>
        }
        textLabel={'Schedule Type'}
        onClickStatus={{
          id: FilterType.scheduleType + 'click',
          onClick: handleClick,
        }}
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
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '10px',
            borderColor: '#E9EBED',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          slotOption={
            <>
              {renderScheduleType('google_meet', 'Google Meet')}
              {renderScheduleType('in_person_meeting', 'In Person Meeting')}
              {renderScheduleType('phone_call', 'Phone Call')}
              {renderScheduleType('zoom', 'Zoom')}
            </>
          }
          onClickDelete={{
            onClick: () => {
              setFilter({ scheduleType: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.scheduleType),
              );
            },
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ scheduleType: [] });
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterScheduleType;
