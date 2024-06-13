import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';

import { Popover, Stack } from '@mui/material';
import { addDays } from 'date-fns';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';

import { ButtonPrimarySmall } from '@/devlink/ButtonPrimarySmall';
import { ButtonTextSmall } from '@/devlink/ButtonTextSmall';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';

import { setFilter, useFilterCandidateStore } from '../../filter-store';

function DateRangeFilterComp() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const filter = useFilterCandidateStore((state) => state.filter);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range' : undefined;

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  return (
    <>
      <ButtonFilter
        slotLeftIcon={
          <Stack>
            <GlobalIcon iconName='calendar_month' />
            {/* <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.875 2C5.10938 2.01563 5.23438 2.14062 5.25 2.375V3.5H9.75V2.375C9.76562 2.14062 9.89062 2.01563 10.125 2C10.3594 2.01563 10.4844 2.14062 10.5 2.375V3.5H11.25C11.6719 3.51563 12.0234 3.66406 12.3047 3.94531C12.5859 4.22656 12.7344 4.57812 12.75 5V5.75V6.5V12.5C12.7344 12.9219 12.5859 13.2734 12.3047 13.5547C12.0234 13.8359 11.6719 13.9844 11.25 14H3.75C3.32812 13.9844 2.97656 13.8359 2.69531 13.5547C2.41406 13.2734 2.26562 12.9219 2.25 12.5V6.5V5.75V5C2.26562 4.57812 2.41406 4.22656 2.69531 3.94531C2.97656 3.66406 3.32812 3.51563 3.75 3.5H4.5V2.375C4.51562 2.14062 4.64062 2.01563 4.875 2ZM12 6.5H9.5625V8.1875H12V6.5ZM12 8.9375H9.5625V10.8125H12V8.9375ZM12 11.5625H9.5625V13.25H11.25C11.4688 13.25 11.6484 13.1797 11.7891 13.0391C11.9297 12.8984 12 12.7188 12 12.5V11.5625ZM8.8125 10.8125V8.9375H6.1875V10.8125H8.8125ZM6.1875 11.5625V13.25H8.8125V11.5625H6.1875ZM5.4375 10.8125V8.9375H3V10.8125H5.4375ZM3 11.5625V12.5C3 12.7188 3.07031 12.8984 3.21094 13.0391C3.35156 13.1797 3.53125 13.25 3.75 13.25H5.4375V11.5625H3ZM3 8.1875H5.4375V6.5H3V8.1875ZM6.1875 8.1875H8.8125V6.5H6.1875V8.1875ZM11.25 4.25H3.75C3.53125 4.25 3.35156 4.32031 3.21094 4.46094C3.07031 4.60156 3 4.78125 3 5V5.75H12V5C12 4.78125 11.9297 4.60156 11.7891 4.46094C11.6484 4.32031 11.4688 4.25 11.25 4.25Z'
                fill='#2F3941'
              />
            </svg> */}
          </Stack>
        }
        isActive={filter.dateRange !== null}
        isDotVisible={filter.dateRange !== null}
        onClickStatus={{
          // id: FilterType.dateRange + 'click',
          onClick: handleClick,
        }}
        textLabel={'Date Range'}
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
          },
        }}
      >
        <Stack position={'relative'}>
          <DateRangePicker
            onChange={(item) => {
              setState([item.selection]);
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction='horizontal'
          />
          <Stack
            direction={'row'}
            position={'absolute'}
            bottom={10}
            left={10}
            spacing={2}
            width={'205px'}
          >
            <ButtonPrimarySmall
              wrapperProps={{
                style: {
                  width: '100%',
                },
              }}
              textLabel='Apply'
              onClickButton={{
                onClick: () => {
                  const startDate = new Date(state[0].startDate).toISOString();
                  const endDate = new Date(state[0].endDate).toISOString();
                  const dateRangeFilter = `[${startDate},${endDate})`;
                  setFilter({ dateRange: dateRangeFilter });
                  handleClose();
                },
              }}
            />
            <ButtonTextSmall
              wrapperProps={{
                style: {
                  width: '100%',
                },
              }}
              textLabel='Delete'
              onClickButton={{
                onClick: () => {
                  setFilter({ dateRange: null });
                  // setFilterVisible(
                  //   filterVisible.filter((f) => f !== FilterType.dateRange),
                  // );
                  handleClose();
                },
              }}
            />
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}

export default DateRangeFilterComp;
