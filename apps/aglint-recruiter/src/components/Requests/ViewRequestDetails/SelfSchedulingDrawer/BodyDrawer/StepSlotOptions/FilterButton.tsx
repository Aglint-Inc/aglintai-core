import { Popover, Stack } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';

import { setAnchorEl, useSelfSchedulingFlowStore } from '../../store';
import ScheduleFilter from '../ScheduleFilter';

function FilterButton() {
  const { filterLoading, anchorEl } = useSelfSchedulingFlowStore((state) => ({
    filterLoading: state.filterLoading,
    anchorEl: state.anchorEl,
  }));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <ButtonSoft
        aria-describedby={id}
        textButton={'Filters'}
        size={1}
        iconName={'discover_tune'}
        isLeftIcon={true}
        onClickButton={{
          onClick: (event) => {
            handleClick(event);
          },
        }}
        isLoading={filterLoading}
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
      >
        <Stack width={'520px'} p={2} bgcolor={'#fff'}>
          <ScheduleFilter />
        </Stack>
      </Popover>
    </>
  );
}

export default FilterButton;
