import { DatabaseTable } from '@aglint/shared-types';
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';

import {
  FilterCandidateState,
  FilterType,
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

function FilterStatus() {
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
  const id = open ? 'filter-status' : undefined;

  const handleFilterClick = (
    status: FilterCandidateState['filter']['status'][0],
  ) => {
    if (filter.status.includes(status)) {
      setFilter({ status: filter.status.filter((s) => s !== status) });
    } else {
      setFilter({ status: [...filter.status, status] });
    }
  };

  const renderStatus = (
    status: DatabaseTable['interview_meeting']['status'],
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
        marginTop={'0px !important'}
      >
        <Checkbox
          isChecked={filter.status.includes(status)}
          onClickCheck={{
            onClick: () => {
              handleFilterClick(status);
            },
          }}
        />
        <Typography
          key={label}
          sx={{
            fontSize: '14px',
            cursor: 'pointer',
          }}
          onClick={() => handleFilterClick(status)}
        >
          {label}
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <ButtonFilter
        isActive={filter.status.length > 0}
        isDotVisible={filter.status.length > 0}
        slotLeftIcon={
          <Stack>
            <GlobalIcon iconName='filter_tilt_shift' />
          </Stack>
        }
        onClickStatus={{
          id: FilterType.status + 'click',
          onClick: handleClick,
        }}
        textLabel={'Status'}
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
              {renderStatus('waiting', 'Unconfirmed')}
              {renderStatus('confirmed', 'Confirmed')}
              {renderStatus('completed', 'Completed')}
              {renderStatus('cancelled', 'Cancelled')}
            </>
          }
          onClickDelete={{
            onClick: () => {
              setFilter({ status: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.status),
              );
            },
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ status: [] });
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterStatus;
