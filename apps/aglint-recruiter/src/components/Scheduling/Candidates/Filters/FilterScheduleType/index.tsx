import { InterviewSession } from '@aglint/shared-types';
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';

import {
  FilterType,
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

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
      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          ':hover': { bgcolor: 'var(--neutral-2)' },
          borderRadius: 'var(--radius-2)',
        }}
        spacing={1}
        padding={'var(--space-2) var(--space-3)'}
      >
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
            <GlobalIcon iconName='flag' />
          </Stack>
        }
        textLabel={'Schedule Type'}
        onClickStatus={{
          id: FilterType.scheduleType + 'click',
          onClick: handleClick,
        }}
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
