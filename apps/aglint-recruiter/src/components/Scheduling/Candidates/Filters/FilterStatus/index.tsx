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
      <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={1}>
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
            fontWeight: 600,
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
            {/* <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.15625 7.4375C1.98438 7.4375 1.84375 7.375 1.73438 7.25C1.625 7.14062 1.58594 7 1.61719 6.82812C1.77344 6.03125 2.07031 5.3125 2.50781 4.67188C2.60156 4.53125 2.72656 4.46094 2.88281 4.46094C3.03906 4.44531 3.1875 4.5 3.32812 4.625C3.51562 4.85938 3.53125 5.11719 3.375 5.39844C3.07812 5.86719 2.86719 6.38281 2.74219 6.94531C2.64844 7.24219 2.45312 7.40625 2.15625 7.4375ZM4.89844 3.875C4.61719 4.03125 4.35938 4.01562 4.125 3.82812C4 3.70313 3.94531 3.55469 3.96094 3.38281C3.96094 3.22656 4.03125 3.10156 4.17188 3.00781C4.8125 2.57031 5.53125 2.27344 6.32812 2.11719C6.5 2.08594 6.64062 2.125 6.75 2.23438C6.875 2.34375 6.9375 2.48438 6.9375 2.65625C6.90625 2.96875 6.74219 3.16406 6.44531 3.24219C5.88281 3.36719 5.36719 3.57812 4.89844 3.875ZM8.0625 13.3438C8.09375 13.0312 8.25781 12.8359 8.55469 12.7578C9.11719 12.6328 9.64062 12.4219 10.125 12.125C10.3906 11.9688 10.6406 11.9844 10.875 12.1719C11 12.3125 11.0547 12.4609 11.0391 12.6172C11.0391 12.7734 10.9688 12.8984 10.8281 12.9922C10.1875 13.4297 9.46875 13.7266 8.67188 13.8828C8.5 13.9141 8.35938 13.875 8.25 13.7656C8.125 13.6562 8.0625 13.5156 8.0625 13.3438ZM11.625 10.625C11.9219 10.1406 12.1328 9.61719 12.2578 9.05469C12.3359 8.75781 12.5312 8.59375 12.8438 8.5625C13.0156 8.5625 13.1562 8.625 13.2656 8.75C13.375 8.85938 13.4141 9 13.3828 9.17188C13.2266 9.96875 12.9297 10.6875 12.4922 11.3281C12.3984 11.4688 12.2734 11.5391 12.1172 11.5391C11.9453 11.5547 11.7969 11.5 11.6719 11.375C11.4688 11.1406 11.4531 10.8906 11.625 10.625ZM4.125 12.1719C4.35938 11.9688 4.61719 11.9531 4.89844 12.125C5.36719 12.4219 5.88281 12.6328 6.44531 12.7578C6.74219 12.8359 6.90625 13.0312 6.9375 13.3438C6.9375 13.5156 6.875 13.6562 6.75 13.7656C6.64062 13.875 6.5 13.9141 6.32812 13.8828C5.53125 13.7266 4.8125 13.4297 4.17188 12.9922C4.03125 12.8984 3.96094 12.7656 3.96094 12.5938C3.94531 12.4375 4 12.2969 4.125 12.1719ZM2.50781 11.3281C2.07031 10.6875 1.77344 9.96875 1.61719 9.17188C1.58594 9 1.625 8.85938 1.73438 8.75C1.84375 8.625 1.98438 8.5625 2.15625 8.5625C2.46875 8.59375 2.66406 8.75781 2.74219 9.05469C2.86719 9.61719 3.07812 10.1406 3.375 10.625C3.53125 10.8906 3.51562 11.1406 3.32812 11.375C3.20312 11.5 3.05469 11.5547 2.88281 11.5391C2.72656 11.5391 2.60156 11.4688 2.50781 11.3281ZM10.875 3.82812C10.6406 4.03125 10.3906 4.04688 10.125 3.875C9.64062 3.57812 9.11719 3.36719 8.55469 3.24219C8.25781 3.16406 8.09375 2.96875 8.0625 2.65625C8.0625 2.48438 8.125 2.34375 8.25 2.23438C8.35938 2.125 8.5 2.08594 8.67188 2.11719C9.46875 2.27344 10.1875 2.57031 10.8281 3.00781C10.9688 3.10156 11.0391 3.22656 11.0391 3.38281C11.0547 3.55469 11 3.70313 10.875 3.82812ZM11.625 5.375C11.4688 5.10938 11.4844 4.85156 11.6719 4.60156C11.7969 4.49219 11.9453 4.44531 12.1172 4.46094C12.2734 4.46094 12.3984 4.53125 12.4922 4.67188C12.9297 5.3125 13.2266 6.03125 13.3828 6.82812C13.4141 6.98438 13.375 7.125 13.2656 7.25C13.1562 7.375 13.0156 7.4375 12.8438 7.4375C12.5312 7.40625 12.3359 7.24219 12.2578 6.94531C12.1328 6.38281 11.9219 5.85938 11.625 5.375Z'
                fill='#2F3941'
              />
            </svg> */}
          </Stack>
        }
        onClickStatus={{
          id: FilterType.status + 'click',
          onClick: handleClick,
        }}
        textLabel={'Status'}
        slotRightIcon={
          <Stack>
            <GlobalIcon iconName='keyboard_arrow_down' />
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
              {renderStatus('waiting', 'Waiting')}
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
